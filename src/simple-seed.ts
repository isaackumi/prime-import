import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prime-importation';

const sampleStores = [
    {
        name: "Tech Gadgets Store",
        slug: "tech-gadgets",
        description: "Your one-stop shop for the latest tech gadgets and electronics",
        theme: {
            primaryColor: "#2563eb",
            secondaryColor: "#1e40af"
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Fashion Boutique",
        slug: "fashion-boutique",
        description: "Trendy fashion items for the modern lifestyle",
        theme: {
            primaryColor: "#ec4899",
            secondaryColor: "#be185d"
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        description: "Everything you need to make your home beautiful",
        theme: {
            primaryColor: "#059669",
            secondaryColor: "#047857"
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Sports Equipment",
        slug: "sports-equipment",
        description: "Quality sports equipment for all your athletic needs",
        theme: {
            primaryColor: "#dc2626",
            secondaryColor: "#b91c1c"
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const sampleProducts = [
    {
        name: "Wireless Bluetooth Headphones",
        slug: "wireless-bluetooth-headphones",
        price: 89.99,
        description: "High-quality wireless headphones with noise cancellation",
        storeSlug: "tech-gadgets",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Smartphone Case",
        slug: "smartphone-case",
        price: 24.99,
        description: "Durable protective case for your smartphone",
        storeSlug: "tech-gadgets",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Summer Dress",
        slug: "summer-dress",
        price: 45.99,
        description: "Elegant summer dress perfect for any occasion",
        storeSlug: "fashion-boutique",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Leather Handbag",
        slug: "leather-handbag",
        price: 129.99,
        description: "Premium leather handbag with multiple compartments",
        storeSlug: "fashion-boutique",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Garden Planter Set",
        slug: "garden-planter-set",
        price: 34.99,
        description: "Beautiful ceramic planters for your garden",
        storeSlug: "home-garden",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Yoga Mat",
        slug: "yoga-mat",
        price: 29.99,
        description: "Non-slip yoga mat for your fitness routine",
        storeSlug: "sports-equipment",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

async function seed() {
    console.log('🌱 Starting database seeding...');

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB successfully');

        const db = client.db();

        // Create stores
        console.log('\n🏪 Creating sample stores...');
        const storesCollection = db.collection('stores');

        for (const store of sampleStores) {
            try {
                // Check if store already exists
                const existingStore = await storesCollection.findOne({ slug: store.slug });
                if (existingStore) {
                    console.log(`⏭️  Store already exists: ${store.name}`);
                    continue;
                }

                await storesCollection.insertOne(store);
                console.log(`✅ Created store: ${store.name} (slug: ${store.slug})`);
            } catch (error) {
                console.error(`❌ Failed to create store: ${store.name}`, error);
            }
        }

        // Create products
        console.log('\n📦 Creating sample products...');
        const productsCollection = db.collection('products');

        for (const product of sampleProducts) {
            try {
                // Check if product already exists
                const existingProduct = await productsCollection.findOne({ slug: product.slug });
                if (existingProduct) {
                    console.log(`⏭️  Product already exists: ${product.name}`);
                    continue;
                }

                // Find the store to get its ID
                const store = await storesCollection.findOne({ slug: product.storeSlug });
                if (!store) {
                    console.error(`❌ Store not found for product: ${product.name}`);
                    continue;
                }

                const productData = {
                    ...product,
                    store: store._id,
                    // Remove storeSlug as it's not part of the product schema
                    storeSlug: undefined
                };
                delete productData.storeSlug;

                await productsCollection.insertOne(productData);
                console.log(`✅ Created product: ${product.name} for store: ${product.storeSlug}`);
            } catch (error) {
                console.error(`❌ Failed to create product: ${product.name}`, error);
            }
        }

        console.log('\n🎉 Seeding completed!');
        console.log('\n🌐 You can now test subdomain access with:');
        sampleStores.forEach(store => {
            console.log(`   - ${store.slug}.yourdomain.com`);
        });

    } catch (error) {
        console.error('💥 Seeding failed with error:', error);
    } finally {
        await client.close();
    }
}

seed(); 