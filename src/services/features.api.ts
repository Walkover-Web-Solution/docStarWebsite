export async function fetchFeatures() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docstar.io';
    const res = await fetch(`${baseUrl}/api/dbdash?table=tblktkxmo`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch features");
    }
    
    const data = await res.json();
    console.log('Features data: ', data);
    return data;
}