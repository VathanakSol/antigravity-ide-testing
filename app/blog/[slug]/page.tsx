import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Revalidate every 60 seconds
export const revalidate = 60

async function getPost(slug: string) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    mainImage,
    publishedAt,
    body
  }`
    return client.fetch(query, { slug })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="min-h-screen bg-white dark:bg-[#0F1530]">
            {/* Hero Section */}
            <div className="w-full flex flex-col md:flex-row h-auto md:h-[500px]">
                {/* Left: Image */}
                <div className="w-full md:w-1/2 relative h-[300px] md:h-full bg-gray-200">
                    {post.mainImage ? (
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                    <Link
                        href="/blog"
                        className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-colors"
                    >
                        &larr; Back
                    </Link>
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2 bg-[#10162F] p-8 md:p-12 flex flex-col justify-between text-white relative">
                    {/* Top Row: Category & Socials */}
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD300]">
                            Technology
                        </span>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <button className="hover:opacity-75 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></button>
                            <button className="hover:opacity-75 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></button>
                            <button className="hover:opacity-75 transition-opacity"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></button>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Author & Date */}
                    <div className="mt-auto border-t border-white/20 pt-6">
                        <div className="flex items-center justify-between text-sm font-medium">
                            <span>Developer 2050</span>
                            <span>
                                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZoneName: 'short'
                                })} • {new Date(post.publishedAt).toLocaleDateString(undefined, {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 py-16 max-w-6xl text-black">
                <div className="prose prose-lg dark:prose-invert mx-auto
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#10162F] dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#10162F] dark:prose-strong:text-white
                    prose-li:marker:text-[#FFD300]
                    prose-img:rounded-2xl prose-img:shadow-xl
                ">
                    <PortableText
                        value={post.body}
                        components={{
                            types: {
                                image: ({ value }) => {
                                    if (!value?.asset?._ref) {
                                        return null
                                    }
                                    return (
                                        <div className="relative w-full h-[500px] my-12 rounded-2xl overflow-hidden shadow-xl bg-gray-50 dark:bg-gray-800">
                                            <Image
                                                src={urlFor(value).url()}
                                                alt={value.alt || ' '}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    )
                                }
                            },
                            block: {
                                h2: ({ children }) => (
                                    <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-6 text-[#10162F] dark:text-white relative inline-block">
                                        {children}
                                        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#FFD300] rounded-full"></span>
                                    </h2>
                                ),
                                h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-[#10162F] dark:text-white">{children}</h3>,
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-[#FFD300] pl-6 py-2 my-10 bg-gray-50 dark:bg-gray-800/50 rounded-r-xl italic text-xl text-gray-700 dark:text-gray-300">
                                        "{children}"
                                    </blockquote>
                                ),
                            }
                        }}
                    />
                </div>
            </div>
        </article>
    )
}
