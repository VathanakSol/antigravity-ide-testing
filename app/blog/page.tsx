import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'

// Revalidate every 60 seconds
export const revalidate = 60

async function getPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
  }`
    return client.fetch(query)
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="mx-auto container px-4 py-12 max-w-6xl">
            <h1 className="text-4xl font-bold mb-12 border-b pb-4">Latest News</h1>
            <div className="flex flex-col gap-8">
                {posts.map((post: any) => (
                    <Link href={`/blog/${post.slug.current}`} key={post._id} className="group block">
                        <div className="flex flex-col md:flex-row gap-6 items-start pb-8 border-b border-gray-100 dark:border-gray-800 last:border-0">
                            {post.mainImage && (
                                <div className="relative w-full md:w-[240px] h-[160px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <Image
                                        src={urlFor(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div className="flex-1 flex flex-col pt-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-accent-yellow uppercase tracking-wider">
                                        LATEST
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold mb-3 text-accent-yellow dark:text-gray-100 transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <div className="flex items-center text-gray-500 text-sm mt-auto">
                                    <span className="font-medium mr-2">Developer 2050</span>
                                    <span>•</span>
                                    <span className="ml-2">
                                        {new Date(post.publishedAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {posts.length === 0 && (
                <div className="text-center text-gray-500 mt-12 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-lg">No posts found.</p>
                    <p className="text-sm mt-2">Go to <Link href="/studio" className="text-blue-500 hover:underline">/studio</Link> to create one!</p>
                </div>
            )}
        </div>
    )
}
