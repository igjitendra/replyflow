export type AIProvider = 'gemini' | 'openai' | 'anthropic';

export interface AIGenerateParams {
  provider: AIProvider;
  apiKey: string;
  businessDetails: string;
  purpose: string;
  tone: string;
  language: string;
  channel?: string;
  existingTemplate?: string;
}

/**
 * Direct client-side AI generator calling provider APIs directly from the browser.
 * API keys are never sent to any server of ours.
 */
export async function generateMessageWithAI(params: AIGenerateParams): Promise<string> {
  const { provider, apiKey, businessDetails, purpose, tone, language, channel = 'WhatsApp', existingTemplate } = params;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error('Please enter a valid API key for your chosen AI provider.');
  }

  const prompt = existingTemplate
    ? `You are an expert copywriter. Rewrite the following business message template for ${channel}.
Business Details: ${businessDetails || 'Small Business'}
Target Channel: ${channel}
Target Tone: ${tone}
Target Language: ${language} (if Hinglish, write natural conversational Hinglish using Latin script)
Purpose: ${purpose}

Original Template:
"""
${existingTemplate}
"""

Instructions:
- Output ONLY the rewritten ready-to-use message template.
- Keep variables in {{variable_name}} double-brace format.
- Make it high-converting, professional, and ready to copy & paste.`
    : `You are an expert copywriter. Create a high-converting, professional ${channel} message template.
Business Details: ${businessDetails}
Target Channel: ${channel}
Purpose / Objective: ${purpose}
Target Tone: ${tone}
Target Language: ${language} (if Hinglish, write natural conversational Hinglish using Latin script)

Instructions:
- Output ONLY the ready-to-use message template text.
- Use placeholders like {{name}}, {{date}}, {{offer}} for customizable details.
- Include appropriate emojis for the business context.`;

  if (provider === 'gemini') {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `Gemini API error (${res.status}): Please check your API key.`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No content returned from Gemini API.');
    return text.trim();
  }

  if (provider === 'openai') {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional business message copywriter.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `OpenAI API error (${res.status}): Please check your API key.`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('No content returned from OpenAI API.');
    return text.trim();
  }

  if (provider === 'anthropic') {
    const endpoint = 'https://api.anthropic.com/v1/messages';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.trim(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson?.error?.message || `Anthropic API error (${res.status}): Please check your API key.`);
    }

    const data = await res.json();
    const text = data?.content?.[0]?.text;
    if (!text) throw new Error('No content returned from Anthropic API.');
    return text.trim();
  }

  throw new Error('Unsupported AI Provider.');
}
