'use server';

import * as cheerio from 'cheerio';

export interface NewsItem {
    id: string;
    title: string;
    url: string;
    source: 'Hacker News' | 'Dev.to';
    points?: string;
    author?: string;
}

type Source = 'hn' | 'devto';
type Category = 'latest' | 'top' | 'show' | 'ask';

export async function getTechNews(source: Source = 'hn', category: Category = 'latest'): Promise<NewsItem[]> {
    try {
        let url = '';

        if (source === 'hn') {
            switch (category) {
                case 'latest': url = 'https://news.ycombinator.com/newest'; break;
                case 'top': url = 'https://news.ycombinator.com/'; break;
                default: url = 'https://news.ycombinator.com/newest';
            }
        } else if (source === 'devto') {
            switch (category) {
                case 'latest': url = 'https://dev.to/latest'; break;
                case 'top': url = 'https://dev.to/top/week'; break;
                default: url = 'https://dev.to/latest';
            }
        }

        const response = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const news: NewsItem[] = [];

        if (source === 'hn') {
            $('.athing').each((i, element) => {
                if (i >= 10) return false;

                const titleElement = $(element).find('.titleline > a').first();
                const title = titleElement.text();
                const url = titleElement.attr('href');
                const id = $(element).attr('id') || `hn-${i}`;

                if (title && url) {
                    news.push({
                        id,
                        title,
                        url,
                        source: 'Hacker News',
                    });
                }
            });
        } else if (source === 'devto') {
            $('.crayons-story').each((i, element) => {
                if (i >= 10) return false;

                const titleElement = $(element).find('.crayons-story__title > a');
                const title = titleElement.text().trim();
                const relativeUrl = titleElement.attr('href');
                const url = relativeUrl ? `${relativeUrl}` : '';
                const id = `devto-${i}`;

                if (title && url) {
                    news.push({
                        id,
                        title,
                        url,
                        source: 'Dev.to',
                    });
                }
            });
        }

        return news;
    } catch (error) {
        console.error('Error fetching tech news:', error);
        return [];
    }
}
