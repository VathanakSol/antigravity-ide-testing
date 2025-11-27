'use server';

import * as cheerio from 'cheerio';

export interface NewsItem {
    id: string;
    title: string;
    url: string;
    source: 'Hacker News' | 'Dev.to' | 'Reddit' | 'GitHub';
    points?: string;
    author?: string;
}

type Source = 'hn' | 'devto' | 'reddit' | 'github';
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
        } else if (source === 'reddit') {
            switch (category) {
                case 'latest': url = 'https://www.reddit.com/r/programming/new/.json'; break;
                case 'top': url = 'https://www.reddit.com/r/programming/hot/.json'; break;
                default: url = 'https://www.reddit.com/r/programming/new/.json';
            }
        } else if (source === 'github') {
            url = 'https://github.com/trending';
        }

        const response = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: source === 'reddit' ? { 'User-Agent': 'TechNewsAggregator/1.0' } : {},
        });

        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        const news: NewsItem[] = [];

        if (source === 'reddit') {
            const data = await response.json();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.data.children.slice(0, 10).forEach((post: any) => {
                news.push({
                    id: post.data.id,
                    title: post.data.title,
                    url: post.data.url,
                    source: 'Reddit',
                    points: post.data.score?.toString(),
                });
            });
        } else {
            const html = await response.text();
            const $ = cheerio.load(html);

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
            } else if (source === 'github') {
                $('article.Box-row').each((i, element) => {
                    if (i >= 10) return false;

                    const titleElement = $(element).find('h2 a');
                    const title = titleElement.text().trim().replace(/\s+/g, ' ');
                    const relativeUrl = titleElement.attr('href');
                    const url = relativeUrl ? `https://github.com${relativeUrl}` : '';
                    const id = `github-${i}`;

                    if (title && url) {
                        news.push({
                            id,
                            title,
                            url,
                            source: 'GitHub',
                        });
                    }
                });
            }
        }

        return news;
    } catch (error) {
        console.error('Error fetching tech news:', error);
        return [];
    }
}
