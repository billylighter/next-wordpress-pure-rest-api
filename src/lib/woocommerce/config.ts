export const WC_FETCH_OPTIONS = {
    next: {
        revalidate: 60
    }
};

export const WC_BASE_URL = process.env.WORDPRESS_URL + '/wp-json/wc/v3';

export const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;

export const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export const WC_TOKEN = Buffer.from(WC_CONSUMER_KEY + ':' + WC_CONSUMER_SECRET).toString("base64");