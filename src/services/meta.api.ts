export async function fetchMeta(name: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docstar.io';
        const res = await fetch(`${baseUrl}/api/dbdash?table=tblqjjbk2`);

        if (!res.ok) {
            throw new Error("Failed to fetch meta");
        }

        const allMeta = await res.json();
        const matchedMeta = Array.isArray(allMeta)
            ? allMeta.find((obj) => obj?.name === name)
            : null;
        return matchedMeta || null;
    } catch (error) {
        console.error('Failed to fetch meta data:', error);
        return null;
    }
}