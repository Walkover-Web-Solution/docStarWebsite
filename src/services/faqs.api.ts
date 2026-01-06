export async function fetchFaqs() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docstar.io';
    const res = await fetch(`${baseUrl}/api/dbdash?table=tbln2q3ez`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch faqs");
    }
    
    const data = await res.json();
    console.log('FAQs data: ', data);
    return data;
}