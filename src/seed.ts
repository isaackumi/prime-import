import 'dotenv/config';
import configPromise from "@payload-config";
import { getPayload } from "payload";


const categories = [
    {
        name: "All",
        slug: "all",
    },
    {
        name: "Business & Money",
        color: "#FFB347",
        slug: "business-money",
        subcategories: [
            { name: "Accounting", slug: "accounting" },
            {
                name: "Entrepreneurship",
                slug: "entrepreneurship",
            },
            { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
            { name: "Investing", slug: "investing" },
            { name: "Management & Leadership", slug: "management-leadership" },
            {
                name: "Marketing & Sales",
                slug: "marketing-sales",
            },
            { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
            { name: "Personal Finance", slug: "personal-finance" },
            { name: "Real Estate", slug: "real-estate" },
        ],
    },
    {
        name: "Software Development",
        color: "#7EC8E3",
        slug: "software-development",
        subcategories: [
            { name: "Web Development", slug: "web-development" },
            { name: "Mobile Development", slug: "mobile-development" },
            { name: "Game Development", slug: "game-development" },
            { name: "Programming Languages", slug: "programming-languages" },
            { name: "DevOps", slug: "devops" },
        ],
    },
    {
        name: "Writing & Publishing",
        color: "#D8B5FF",
        slug: "writing-publishing",
        subcategories: [
            { name: "Fiction", slug: "fiction" },
            { name: "Non-Fiction", slug: "non-fiction" },
            { name: "Blogging", slug: "blogging" },
            { name: "Copywriting", slug: "copywriting" },
            { name: "Self-Publishing", slug: "self-publishing" },
        ],
    },
    {
        name: "Other",
        slug: "other",
    },
    {
        name: "Education",
        color: "#FFE066",
        slug: "education",
        subcategories: [
            { name: "Online Courses", slug: "online-courses" },
            { name: "Tutoring", slug: "tutoring" },
            { name: "Test Preparation", slug: "test-preparation" },
            { name: "Language Learning", slug: "language-learning" },
        ],
    },
    {
        name: "Self Improvement",
        color: "#96E6B3",
        slug: "self-improvement",
        subcategories: [
            { name: "Productivity", slug: "productivity" },
            { name: "Personal Development", slug: "personal-development" },
            { name: "Mindfulness", slug: "mindfulness" },
            { name: "Career Growth", slug: "career-growth" },
        ],
    },
    {
        name: "Fitness & Health",
        color: "#FF9AA2",
        slug: "fitness-health",
        subcategories: [
            { name: "Workout Plans", slug: "workout-plans" },
            { name: "Nutrition", slug: "nutrition" },
            { name: "Mental Health", slug: "mental-health" },
            { name: "Yoga", slug: "yoga" },
        ],
    },
    {
        name: "Design",
        color: "#B5B9FF",
        slug: "design",
        subcategories: [
            { name: "UI/UX", slug: "ui-ux" },
            { name: "Graphic Design", slug: "graphic-design" },
            { name: "3D Modeling", slug: "3d-modeling" },
            { name: "Typography", slug: "typography" },
        ],
    },
    {
        name: "Drawing & Painting",
        color: "#FFCAB0",
        slug: "drawing-painting",
        subcategories: [
            { name: "Watercolor", slug: "watercolor" },
            { name: "Acrylic", slug: "acrylic" },
            { name: "Oil", slug: "oil" },
            { name: "Pastel", slug: "pastel" },
            { name: "Charcoal", slug: "charcoal" },
        ],
    },
    {
        name: "Music",
        color: "#FFD700",
        slug: "music",
        subcategories: [
            { name: "Songwriting", slug: "songwriting" },
            { name: "Music Production", slug: "music-production" },
            { name: "Music Theory", slug: "music-theory" },
            { name: "Music History", slug: "music-history" },
        ],
    },
    {
        name: "Photography",
        color: "#FF6B6B",
        slug: "photography",
        subcategories: [
            { name: "Portrait", slug: "portrait" },
            { name: "Landscape", slug: "landscape" },
            { name: "Street Photography", slug: "street-photography" },
            { name: "Nature", slug: "nature" },
            { name: "Macro", slug: "macro" },
        ],
    },
]

const sampleStores = [
    {
        name: "Tech Gadgets Store",
        slug: "tech-gadgets",
        description: "Your one-stop shop for the latest tech gadgets and electronics",
        theme: {
            primaryColor: "#2563eb",
            secondaryColor: "#1e40af"
        },
        isActive: true
    },
    {
        name: "Fashion Boutique",
        slug: "fashion-boutique",
        description: "Trendy fashion items for the modern lifestyle",
        theme: {
            primaryColor: "#ec4899",
            secondaryColor: "#be185d"
        },
        isActive: true
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        description: "Everything you need to make your home beautiful",
        theme: {
            primaryColor: "#059669",
            secondaryColor: "#047857"
        },
        isActive: true
    },
    {
        name: "Sports Equipment",
        slug: "sports-equipment",
        description: "Quality sports equipment for all your athletic needs",
        theme: {
            primaryColor: "#dc2626",
            secondaryColor: "#b91c1c"
        },
        isActive: true
    }
]

const seed = async () => {
    console.log('🌱 Starting database seeding...');

    try {
        console.log('📡 Connecting to Payload...');
        const payload = await getPayload({ config: configPromise });
        console.log('✅ Connected to Payload successfully');

        let createdCategories = 0;
        let createdSubcategories = 0;

        for (const category of categories) {
            try {
                console.log(`📝 Creating category: ${category.name}`);

                const parentCategory = await payload.create({
                    collection: "categories" as any,
                    data: {
                        name: category.name,
                        slug: category.slug,
                        color: category.color,
                    }
                });

                console.log(`✅ Created category: ${category.name} (ID: ${parentCategory.id})`);
                createdCategories++;

                if (category.subcategories && category.subcategories.length > 0) {
                    console.log(`  📝 Creating ${category.subcategories.length} subcategories for ${category.name}...`);

                    for (const subcategory of category.subcategories) {
                        try {
                            await payload.create({
                                collection: "categories" as any,
                                data: {
                                    name: subcategory.name,
                                    slug: subcategory.slug,
                                    parent: parentCategory.id,
                                }
                            });

                            console.log(`    ✅ Created subcategory: ${subcategory.name}`);
                            createdSubcategories++;
                        } catch (subcategoryError) {
                            console.error(`    ❌ Failed to create subcategory: ${subcategory.name}`, subcategoryError);
                        }
                    }
                }
            } catch (categoryError) {
                console.error(`❌ Failed to create category: ${category.name}`, categoryError);
            }
        }

        console.log('\n🎉 Seeding completed!');
        console.log(`📊 Summary:`);
        console.log(`   - Categories created: ${createdCategories}`);
        console.log(`   - Subcategories created: ${createdSubcategories}`);
        console.log(`   - Total items created: ${createdCategories + createdSubcategories}`);

        // Create sample stores
        console.log('\n🏪 Creating sample stores...');
        let createdStores = 0;

        for (const store of sampleStores) {
            try {
                console.log(`📝 Creating store: ${store.name}`);

                await payload.create({
                    collection: "stores" as any,
                    data: {
                        name: store.name,
                        slug: store.slug,
                        description: store.description,
                        theme: store.theme,
                        isActive: store.isActive,
                        owner: 'demo-owner', // Placeholder owner
                    }
                });

                console.log(`✅ Created store: ${store.name} (slug: ${store.slug})`);
                createdStores++;
            } catch (storeError) {
                console.error(`❌ Failed to create store: ${store.name}`, storeError);
            }
        }

        console.log('\n🎉 Store seeding completed!');
        console.log(`📊 Store Summary:`);
        console.log(`   - Stores created: ${createdStores}`);
        console.log(`   - Available store slugs: ${sampleStores.map(s => s.slug).join(', ')}`);
        console.log('\n🌐 You can now test subdomain access with:');
        sampleStores.forEach(store => {
            console.log(`   - ${store.slug}.yourdomain.com`);
        });

        // Create sample products for each store
        console.log('\n📦 Creating sample products...');
        let createdProducts = 0;

        const sampleProducts = [
            {
                name: "Wireless Bluetooth Headphones",
                slug: "wireless-bluetooth-headphones",
                price: 89.99,
                description: "High-quality wireless headphones with noise cancellation",
                storeSlug: "tech-gadgets"
            },
            {
                name: "Smartphone Case",
                slug: "smartphone-case",
                price: 24.99,
                description: "Durable protective case for your smartphone",
                storeSlug: "tech-gadgets"
            },
            {
                name: "Summer Dress",
                slug: "summer-dress",
                price: 45.99,
                description: "Elegant summer dress perfect for any occasion",
                storeSlug: "fashion-boutique"
            },
            {
                name: "Leather Handbag",
                slug: "leather-handbag",
                price: 129.99,
                description: "Premium leather handbag with multiple compartments",
                storeSlug: "fashion-boutique"
            },
            {
                name: "Garden Planter Set",
                slug: "garden-planter-set",
                price: 34.99,
                description: "Beautiful ceramic planters for your garden",
                storeSlug: "home-garden"
            },
            {
                name: "Yoga Mat",
                slug: "yoga-mat",
                price: 29.99,
                description: "Non-slip yoga mat for your fitness routine",
                storeSlug: "sports-equipment"
            }
        ];

        for (const product of sampleProducts) {
            try {
                console.log(`📝 Creating product: ${product.name}`);

                // Find the store by slug
                const store = await payload.find({
                    collection: "stores",
                    where: {
                        slug: {
                            equals: product.storeSlug,
                        },
                    },
                    limit: 1,
                });

                if (store.docs.length === 0) {
                    console.error(`❌ Store not found for product: ${product.name}`);
                    continue;
                }

                await payload.create({
                    collection: "products" as any,
                    data: {
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        description: product.description,
                        store: store.docs[0].id,
                        isActive: true,
                    }
                });

                console.log(`✅ Created product: ${product.name} for store: ${product.storeSlug}`);
                createdProducts++;
            } catch (productError) {
                console.error(`❌ Failed to create product: ${product.name}`, productError);
            }
        }

        console.log('\n🎉 Product seeding completed!');
        console.log(`📊 Product Summary:`);
        console.log(`   - Products created: ${createdProducts}`);

    } catch (error) {
        console.error('💥 Seeding failed with error:', error);
        process.exit(1);
    }
}

console.log('🚀 Starting seed script...');
await seed();
console.log('✨ Seed script finished successfully');
process.exit(0);