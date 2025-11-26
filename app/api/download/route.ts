export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const imageUrl = searchParams.get('url');

        if (!imageUrl) {
            return new Response('Missing image URL', { status: 400 });
        }

        // Fetch the image from Cloudflare R2
        const response = await fetch(imageUrl);
        
        if (!response.ok) {
            return new Response('Failed to fetch image', { status: response.status });
        }

        const blob = await response.blob();
        
        // Return the image with proper CORS headers
        return new Response(blob, {
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
                'Content-Disposition': 'attachment',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        console.error('Download error:', error);
        return new Response('Download failed', { status: 500 });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
