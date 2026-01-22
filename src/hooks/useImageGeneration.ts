import { useState, useCallback } from 'react';
import api from '../utils/service';


export interface ImageResult {
    id: string;
    url: string;
    prompt: string;
    style?: string;
    aspectRatio?: string;
    timestamp: number;
}

export function useImageGeneration() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<ImageResult | null>(null);

    const generateImage = useCallback(async ({ prompt, style, aspectRatio }: { prompt: string; style?: string; aspectRatio?: string }) => {
        setLoading(true);
        setError(null);

        try {
            const styleMap: Record<string, string> = {
                Realistic: "photorealistic, 8k, highly detailed",
                Cartoon: "cartoon style, vector art, vibrant colors",
                Anime: "anime style, high detail, studio ghibli inspired",
                "3D": "3d render, unreal engine, octane render"
            };

            const aspectRatioMap: Record<string, string> = {
                "1:1": "",
                "16:9": ", wide aspect ratio 16:9",
                "9:16": ", tall portrait aspect ratio 9:16",
                "4:3": ", 4:3 aspect ratio",
                "3:4": ", 3:4 aspect ratio"
            };

            let finalPrompt = prompt;

            if (style && style !== 'None' && styleMap[style]) {
                finalPrompt += `, ${styleMap[style]}`;
            }

            if (aspectRatio && aspectRatioMap[aspectRatio]) {
                finalPrompt += aspectRatioMap[aspectRatio];
            }

            const response = await api.post('',
                {
                    inputs: finalPrompt,
                    options: { wait_for_model: true }
                },
                {
                    responseType: 'blob',
                    headers: {
                        'Accept': 'image/png'
                    }
                }
            );

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
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { generateImage, currentImage, loading, error, clearImage: () => setCurrentImage(null), setCurrentImage };
}