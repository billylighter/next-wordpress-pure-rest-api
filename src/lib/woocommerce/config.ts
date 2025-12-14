export const WC_BASE_URL =
    `${process.env.WORDPRESS_URL}/wp-json/wc/v3`;

export const WC_FETCH_OPTIONS = {
    next: { revalidate: 60 }
};
