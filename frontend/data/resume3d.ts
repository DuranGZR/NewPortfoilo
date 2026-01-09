export interface IslandItem {
    title: string;
    description: string;
    date?: string;
    tags?: string[];
}

export interface Island3DData {
    id: string;
    title: string;
    position: [number, number, number];
    color: string;
    icon: string;
    items: IslandItem[];
}

export const islands: Island3DData[] = [
    {
        id: 'about',
        title: 'Hakkımda',
        position: [0, 3, -10],
        color: '#819fa7',
        icon: 'user',
        items: [
            {
                title: 'Duran Gezer',
                description: 'Yapay zeka ve makine öğrenmesi alanında tutkulu bir mühendis adayı.',
            },
            {
                title: 'Vizyon',
                description: 'Gerçek dünya problemlerini çözen akıllı sistemler geliştirmek.',
            },
            {
                title: 'Yaklaşım',
                description: 'Sürekli öğrenme, temiz kod ve kullanıcı odaklı tasarım.',
            },
        ],
    },
    {
        id: 'education',
        title: 'Eğitim',
        position: [-8, 0, 0],
        color: '#6b8a92',
        icon: 'book',
        items: [
            {
                title: 'Bilgisayar Mühendisliği',
                description: 'Lisans eğitimi, yapay zeka ve yazılım geliştirme odaklı.',
                date: '2021 - 2025',
                tags: ['AI', 'ML', 'Software'],
            },
            {
                title: 'Online Sertifikalar',
                description: 'Coursera, Udacity ve diğer platformlardan AI/ML sertifikaları.',
                tags: ['Deep Learning', 'NLP', 'Computer Vision'],
            },
        ],
    },
    {
        id: 'experience',
        title: 'Deneyim',
        position: [-5, -1, 8],
        color: '#5b7a82',
        icon: 'briefcase',
        items: [
            {
                title: 'Staj Deneyimi',
                description: 'Yazılım geliştirme ve veri analizi projelerinde çalışma.',
                date: '2023',
                tags: ['Python', 'Data Analysis'],
            },
            {
                title: 'Freelance Projeler',
                description: 'Web uygulamaları ve otomasyon çözümleri geliştirme.',
                date: '2022 - Günümüz',
                tags: ['React', 'Node.js', 'Automation'],
            },
        ],
    },
    {
        id: 'skills',
        title: 'Yetenekler',
        position: [8, 0, 0],
        color: '#4a9a8c',
        icon: 'zap',
        items: [
            {
                title: 'Programlama Dilleri',
                description: 'Python, TypeScript, JavaScript, C++',
                tags: ['Python', 'TypeScript', 'C++'],
            },
            {
                title: 'AI/ML Frameworks',
                description: 'TensorFlow, PyTorch, Scikit-learn, Hugging Face',
                tags: ['TensorFlow', 'PyTorch', 'HuggingFace'],
            },
            {
                title: 'Web Teknolojileri',
                description: 'React, Next.js, Node.js, Tailwind CSS',
                tags: ['React', 'Next.js', 'Tailwind'],
            },
            {
                title: 'Araçlar',
                description: 'Git, Docker, Linux, VS Code',
                tags: ['Git', 'Docker', 'Linux'],
            },
        ],
    },
    {
        id: 'projects',
        title: 'Projeler',
        position: [5, -1, 8],
        color: '#3d8b9e',
        icon: 'rocket',
        items: [
            {
                title: 'AI Portfolio',
                description: 'Next.js ve React Three Fiber ile interaktif 3D portfolio sitesi.',
                tags: ['Next.js', 'Three.js', 'AI'],
            },
            {
                title: 'ML Model Visualizer',
                description: '11 farklı makine öğrenmesi modelinin 3D görselleştirmesi.',
                tags: ['3D', 'Education', 'ML'],
            },
            {
                title: 'Sentiment Analysis',
                description: 'Doğal dil işleme ile duygu analizi uygulaması.',
                tags: ['NLP', 'Python', 'BERT'],
            },
        ],
    },
];
