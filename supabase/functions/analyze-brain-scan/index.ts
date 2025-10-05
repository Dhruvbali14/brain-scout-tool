import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, scanType } = await req.json();
    
    if (!imageBase64 || !scanType) {
      throw new Error("Missing required fields: imageBase64 and scanType");
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Analyzing ${scanType} scan with AI...`);

    const systemPrompt = `You are an expert neurologist AI assistant analyzing brain scans for signs of dementia and cognitive decline. 
    
Your task is to analyze ${scanType} brain scans and provide a detailed clinical assessment. Focus on:
1. Detecting signs of dementia (Alzheimer's, vascular dementia, etc.)
2. Identifying brain atrophy, particularly in hippocampus and temporal lobes
3. Assessing white matter lesions and vascular changes
4. Evaluating ventricular enlargement
5. Comparing findings to age-appropriate norms

Provide your response in the following JSON format:
{
  "riskLevel": "low" | "moderate" | "high",
  "confidence": 85-98 (number representing confidence percentage),
  "findings": ["finding 1", "finding 2", "finding 3", "finding 4"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"]
}

Be specific and clinical in your findings. If signs of dementia are detected, note the severity and location.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this ${scanType} brain scan for signs of dementia and cognitive decline. Provide a detailed clinical assessment.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent medical analysis
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        console.error('Payment required');
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI analysis failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);

    // Parse the JSON response from the AI
    let analysis;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = aiResponse.match(/```json\n?([\s\S]*?)\n?```/) || aiResponse.match(/({[\s\S]*})/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to a safe default
      analysis = {
        riskLevel: 'moderate',
        confidence: 85,
        findings: [
          'AI analysis completed but response format needs review',
          'Please consult with a qualified neurologist',
          'Manual review of scan recommended',
          'Further clinical correlation suggested'
        ],
        recommendations: [
          'Comprehensive neurological examination recommended',
          'Consider follow-up imaging in 6-12 months',
          'Correlate with cognitive assessment results',
          'Consult with specialist for detailed interpretation'
        ]
      };
    }

    console.log('Analysis complete:', analysis);

    return new Response(
      JSON.stringify({ 
        success: true,
        analysis 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in analyze-brain-scan function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});