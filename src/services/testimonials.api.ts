export async function fetchTestimonials() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docstar.io';
    const res = await fetch(`${baseUrl}/api/dbdash?table=tblw7pelp`);
    
    if (!res.ok) {
        throw new Error("Failed to fetch testimonials");
    }
    
    const data = await res.json();
    return data;
}