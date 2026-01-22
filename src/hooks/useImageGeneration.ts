import { useState, useCallback } from 'react';
import api from '../utils/service';


export interface ImageResult {
    id: string;
    url: string;
    prompt: string;
    timestamp: number;
}

export function useImageGeneration() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<any>(null);

    const generateImage = useCallback(async ({ prompt, style }: { prompt: string; style?: string }) => {
        setLoading(true);
        setError(null);

        try {
            const styleMap: Record<string, string> = {
                Realistic: "photorealistic, 8k",
                Cartoon: "cartoon style, vector art",
                Anime: "anime style, high detail",
                "3D": "3d render, unreal engine"
            };

            const fullPrompt = style && style !== 'None'
                ? `${prompt}, ${styleMap[style] || style}`
                : prompt;

            // Use the api instance
            const response = await api.post('',
                {
                    inputs: fullPrompt,
                    options: { wait_for_model: true }
                },
                {
                    responseType: 'blob',
                    // Optional: Force the header here just to be safe
                    headers: {
                        'Accept': 'image/png'
                    }
                }
            );

            // Convert to Base64
            const base64Data = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(response.data);
            });

            const result = {
                id: crypto.randomUUID(),
                url: base64Data,
                prompt,
                timestamp: Date.now(),
            };

            setCurrentImage(result);
            return result;

        } catch (err: any) {
            // The interceptor already formatted this error string
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { generateImage, currentImage, loading, error, clearImage: () => setCurrentImage(null), setCurrentImage };
}