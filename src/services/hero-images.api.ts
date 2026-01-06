export async function fetchHeroImages() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docstar.io';
    const res = await fetch(`${baseUrl}/api/dbdash?table=tblclbnkb`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch hero images");
    }
    
    const data = await res.json();
    console.log('Hero images data: ', data);
    return data;
}