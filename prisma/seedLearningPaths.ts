import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const learningPathsData = [
    {
        title: 'DevOps Engineer',
        description: 'Master the art of building, deploying, and maintaining scalable infrastructure.',
        skill: 'DevOps',
        icon: '🚀',
        difficulty: 'Intermediate',
        duration: '6-8 months',
        steps: [
            {
                title: 'Linux Fundamentals',
                description: 'Learn Linux command line, file systems, permissions, and shell scripting.',
                order: 1,
                resources: [
                    'Linux Journey (linuxjourney.com)',
                    'The Linux Command Line by William Shotts',
                    'OverTheWire Bandit (wargames)',
                ],
                estimatedHours: 40,
            },
            {
                title: 'Version Control with Git',
                description: 'Master Git workflows, branching strategies, and collaboration techniques.',
                order: 2,
                resources: [
                    'Pro Git Book (git-scm.com)',
                    'GitHub Learning Lab',
                    'Atlassian Git Tutorials',
                ],
                estimatedHours: 20,
            },
            {
                title: 'Networking Basics',
                description: 'Understand TCP/IP, DNS, HTTP/HTTPS, load balancing, and firewalls.',
                order: 3,
                resources: [
                    'Computer Networking: A Top-Down Approach',
                    'Cisco Networking Basics',
                    'NetworkChuck YouTube Channel',
                ],
                estimatedHours: 30,
            },
            {
                title: 'Containerization with Docker',
                description: 'Learn Docker fundamentals, Dockerfile creation, and container orchestration basics.',
                order: 4,
                resources: [
                    'Docker Official Documentation',
                    'Docker Mastery Course (Udemy)',
                    'Play with Docker (labs.play-with-docker.com)',
                ],
                estimatedHours: 35,
            },
            {
                title: 'Kubernetes Orchestration',
                description: 'Deploy and manage containerized applications at scale with Kubernetes.',
                order: 5,
                resources: [
                    'Kubernetes Official Tutorials',
                    'Kubernetes the Hard Way',
                    'KodeKloud Kubernetes Course',
                ],
                estimatedHours: 50,
            },
            {
                title: 'CI/CD Pipelines',
                description: 'Implement continuous integration and deployment with Jenkins, GitLab CI, or GitHub Actions.',
                order: 6,
                resources: [
                    'GitHub Actions Documentation',
                    'Jenkins User Documentation',
                    'GitLab CI/CD Tutorials',
                ],
                estimatedHours: 30,
            },
            {
                title: 'Infrastructure as Code',
                description: 'Automate infrastructure provisioning with Terraform and Ansible.',
                order: 7,
                resources: [
                    'Terraform Official Tutorials',
                    'Ansible for DevOps by Jeff Geerling',
                    'HashiCorp Learn Platform',
                ],
                estimatedHours: 40,
            },
            {
                title: 'Cloud Platforms',
                description: 'Get hands-on with AWS, Azure, or GCP services and architecture.',
                order: 8,
                resources: [
                    'AWS Certified Solutions Architect',
                    'A Cloud Guru',
                    'Google Cloud Skills Boost',
                ],
                estimatedHours: 60,
            },
            {
                title: 'Monitoring & Logging',
                description: 'Implement observability with Prometheus, Grafana, ELK stack, and distributed tracing.',
                order: 9,
                resources: [
                    'Prometheus Documentation',
                    'Grafana Tutorials',
                    'Elastic Stack Guide',
                ],
                estimatedHours: 35,
            },
        ],
    },
    {
        title: 'Full Stack Developer',
        description: 'Build complete web applications from frontend to backend and deployment.',
        skill: 'Full Stack',
        icon: '💻',
        difficulty: 'Beginner',
        duration: '8-10 months',
        steps: [
            {
                title: 'HTML & CSS Fundamentals',
                description: 'Master semantic HTML, CSS layouts, Flexbox, Grid, and responsive design.',
                order: 1,
                resources: [
                    'MDN Web Docs',
                    'CSS Tricks',
                    'freeCodeCamp Responsive Web Design',
                ],
                estimatedHours: 40,
            },
            {
                title: 'JavaScript Essentials',
                description: 'Learn JavaScript fundamentals, ES6+, DOM manipulation, and async programming.',
                order: 2,
                resources: [
                    'JavaScript.info',
                    'Eloquent JavaScript',
                    'You Don\'t Know JS (book series)',
                ],
                estimatedHours: 60,
            },
            {
                title: 'Frontend Framework (React)',
                description: 'Build interactive UIs with React, hooks, state management, and routing.',
                order: 3,
                resources: [
                    'React Official Documentation',
                    'Full Stack Open (React section)',
                    'Epic React by Kent C. Dodds',
                ],
                estimatedHours: 50,
            },
            {
                title: 'Backend with Node.js',
                description: 'Create RESTful APIs with Node.js, Express, and understand server-side concepts.',
                order: 4,
                resources: [
                    'Node.js Official Docs',
                    'The Complete Node.js Developer Course',
                    'Express.js Guide',
                ],
                estimatedHours: 45,
            },
            {
                title: 'Database Management',
                description: 'Work with SQL (PostgreSQL) and NoSQL (MongoDB) databases.',
                order: 5,
                resources: [
                    'PostgreSQL Tutorial',
                    'MongoDB University',
                    'SQL Zoo',
                ],
                estimatedHours: 40,
            },
            {
                title: 'Authentication & Security',
                description: 'Implement JWT, OAuth, password hashing, and security best practices.',
                order: 6,
                resources: [
                    'OWASP Top 10',
                    'Auth0 Documentation',
                    'Web Security Academy',
                ],
                estimatedHours: 30,
            },
            {
                title: 'API Design & Integration',
                description: 'Design RESTful APIs, work with GraphQL, and integrate third-party services.',
                order: 7,
                resources: [
                    'REST API Tutorial',
                    'GraphQL Official Tutorial',
                    'Postman Learning Center',
                ],
                estimatedHours: 25,
            },
            {
                title: 'Testing & Quality Assurance',
                description: 'Write unit tests, integration tests, and E2E tests with Jest and Cypress.',
                order: 8,
                resources: [
                    'Jest Documentation',
                    'Testing Library',
                    'Cypress.io Tutorials',
                ],
                estimatedHours: 35,
            },
            {
                title: 'Deployment & DevOps Basics',
                description: 'Deploy applications to cloud platforms, set up CI/CD, and monitor production.',
                order: 9,
                resources: [
                    'Vercel Documentation',
                    'Heroku Dev Center',
                    'Docker for Beginners',
                ],
                estimatedHours: 30,
            },
        ],
    },
    {
        title: 'Cloud Architect',
        description: 'Design and implement scalable, secure, and cost-effective cloud solutions.',
        skill: 'Cloud Architecture',
        icon: '☁️',
        difficulty: 'Advanced',
        duration: '10-12 months',
        steps: [
            {
                title: 'Cloud Computing Fundamentals',
                description: 'Understand IaaS, PaaS, SaaS, and core cloud concepts.',
                order: 1,
                resources: [
                    'AWS Cloud Practitioner Essentials',
                    'Microsoft Azure Fundamentals',
                    'Google Cloud Fundamentals',
                ],
                estimatedHours: 30,
            },
            {
                title: 'Compute Services',
                description: 'Master EC2, Lambda, App Service, Cloud Functions, and serverless architectures.',
                order: 2,
                resources: [
                    'AWS Compute Services Deep Dive',
                    'Serverless Framework Documentation',
                    'Azure Compute Documentation',
                ],
                estimatedHours: 45,
            },
            {
                title: 'Storage & Databases',
                description: 'Work with S3, RDS, DynamoDB, Blob Storage, and managed database services.',
                order: 3,
                resources: [
                    'AWS Storage Services',
                    'Database Migration Strategies',
                    'Cloud Database Best Practices',
                ],
                estimatedHours: 40,
            },
            {
                title: 'Networking & Content Delivery',
                description: 'Design VPCs, subnets, load balancers, CDNs, and network security.',
                order: 4,
                resources: [
                    'AWS VPC Masterclass',
                    'Azure Networking',
                    'CloudFront & CDN Strategies',
                ],
                estimatedHours: 50,
            },
            {
                title: 'Security & Compliance',
                description: 'Implement IAM, encryption, compliance frameworks, and security best practices.',
                order: 5,
                resources: [
                    'AWS Security Best Practices',
                    'Cloud Security Alliance',
                    'Azure Security Center',
                ],
                estimatedHours: 45,
            },
            {
                title: 'High Availability & Disaster Recovery',
                description: 'Design fault-tolerant systems with multi-region deployments and backup strategies.',
                order: 6,
                resources: [
                    'AWS Well-Architected Framework',
                    'Disaster Recovery Planning',
                    'High Availability Patterns',
                ],
                estimatedHours: 40,
            },
            {
                title: 'Cost Optimization',
                description: 'Analyze and optimize cloud spending with cost management tools and strategies.',
                order: 7,
                resources: [
                    'AWS Cost Optimization',
                    'Azure Cost Management',
                    'FinOps Foundation',
                ],
                estimatedHours: 25,
            },
            {
                title: 'Architecture Patterns',
                description: 'Learn microservices, event-driven, and cloud-native architecture patterns.',
                order: 8,
                resources: [
                    'Cloud Design Patterns',
                    'Microservices Architecture',
                    'Event-Driven Architecture Guide',
                ],
                estimatedHours: 50,
            },
        ],
    },
];

async function seedLearningPaths() {
    console.log('Seeding learning paths...');

    for (const pathData of learningPathsData) {
        const { steps, ...pathInfo } = pathData;

        const learningPath = await prisma.learningPath.create({
            data: {
                ...pathInfo,
                steps: {
                    create: steps,
                },
            },
        });

        console.log(`Created learning path: ${learningPath.title}`);
    }

    console.log('Learning paths seeded successfully!');
}

seedLearningPaths()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
