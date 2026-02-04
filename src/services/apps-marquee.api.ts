export async function fetchAppsMarquee() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docstar.io';
        const res = await fetch(`${baseUrl}/api/dbdash?table=tbl6e3woq`);

        if (!res.ok) {
            throw new Error("Failed to fetch apps marquee");
        }

        const appsMarquee = await res.json();
        return appsMarquee;
    } catch (error) {
        console.error('Failed to fetch apps marquee data:', error);
        return null;
    }
}