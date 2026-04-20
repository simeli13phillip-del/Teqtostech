from pathlib import Path
replacements = {
    'Connect African Talent to Global Opportunities': 'Connect Talent to Global Opportunities',
    'Connect with verified African professionals and build your career network globally.': 'Connect with verified professionals and build your career network globally.',
    'Join thousands of African professionals who are advancing their careers with premium recommendations and smart alerts.': 'Join thousands of professionals who are advancing their careers with premium recommendations and smart alerts.',
    'Connecting African talent to global opportunities, empowering skilled professionals worldwide.': 'Connecting talent to global opportunities, empowering skilled professionals worldwide.',
    'Empowering African talent. Connecting global opportunity. Transforming careers.': 'Empowering global talent. Connecting opportunity worldwide. Transforming careers.',
    "TeQtos is a transformative platform designed to bridge the gap between Africa's exceptional talent and global opportunities. We recognize the immense skill, dedication, and expertise that exists across the continent—yet we also understand the challenges that skilled professionals face in accessing international markets.": "TeQtos is a transformative platform designed to bridge the gap between exceptional talent and global opportunities. We recognize the immense skill, dedication, and expertise that professionals bring to the global market—and we understand the challenges they face in accessing international opportunities.",
    'To bridge the gap between African talent and global demand by providing a trusted, professional platform where technicians and freelancers can create verified profiles, gain visibility, and access high-quality job opportunities. We\'re committed to making skills—not geography—the defining factor in career success.': 'To bridge the gap between talent and global demand by providing a trusted, professional platform where technicians and freelancers can create verified profiles, gain visibility, and access high-quality job opportunities. We\'re committed to making skills—not geography—the defining factor in career success.',
    'To become the leading global platform that connects African talent to limitless opportunities, empowering skilled professionals to showcase their expertise, access international markets, and build sustainable careers without borders.': 'To become the leading global platform that connects talented professionals to limitless opportunities, empowering skilled individuals to showcase their expertise, access international markets, and build sustainable careers without borders.',
    'We believe in lifting up African talent. Our tools, resources, and opportunities are designed to help professionals achieve their full potential.': 'We believe in lifting up global talent. Our tools, resources, and opportunities are designed to help professionals achieve their full potential.',
    'Visionary leader dedicated to connecting African talent with global opportunities.': 'Visionary leader dedicated to connecting talent with global opportunities.',
    'Connect with employers and clients from around the world seeking African talent.': 'Connect with employers and clients from around the world seeking skilled professionals.',
    'content="Join TeQtos - Professional Network for African Talent"': 'content="Join TeQtos - Professional Network for Global Talent"',
    'Connect with skilled African professionals for your project needs': 'Connect with skilled professionals for your project needs',
    'content="TeQtos Technician Ranking System - Professional certification levels for African AV technicians"': 'content="TeQtos Technician Ranking System - Professional certification levels for AV technicians worldwide"',
    'Join thousands of African technicians who are already leveling up their careers.': 'Join thousands of technicians who are already leveling up their careers.',
    'Connecting African talent to global opportunities through verified certifications and professional networking.': 'Connecting talent to global opportunities through verified certifications and professional networking.',
    'Comprehensive solutions connecting African AV, sound, lighting, and technical professionals with global opportunities': 'Comprehensive solutions connecting AV, sound, lighting, and technical professionals with global opportunities',
    'To bridge the gap between African talent and global demand by providing a trusted, professional platform where technicians and freelancers can create verified profiles, gain visibility, and access high-quality job opportunities while supporting AV/entertainment companies in finding skilled professionals and connecting with reliable service providers.': 'To bridge the gap between talent and global demand by providing a trusted, professional platform where technicians and freelancers can create verified profiles, gain visibility, and access high-quality job opportunities while supporting AV/entertainment companies in finding skilled professionals and connecting with reliable service providers.',
    'To become the leading global platform that connects African talent to limitless opportunities, empowering skilled professionals to showcase their expertise, access international markets, and build sustainable careers without borders while fostering a thriving ecosystem of AV/entertainment service providers and technical professionals.': 'To become the leading global platform that connects talented professionals to limitless opportunities, empowering skilled individuals to showcase their expertise, access international markets, and build sustainable careers without borders while fostering a thriving ecosystem of AV/entertainment service providers and technical professionals.',
    'Join thousands of African professionals connecting with global opportunities.': 'Join thousands of professionals connecting with global opportunities.',
    'African Talent Platform': 'Global Talent Platform',
    'Be the first to post a job opportunity and connect with skilled African professionals.': 'Be the first to post a job opportunity and connect with skilled professionals.'
}
files = [
    'index.html',
    'pages/about.html',
    'pages/services.html',
    'pages/auth.html',
    'pages/post-job.html',
    'pages/rankings.html',
    'pages/service-directory.html',
    'pages/terms-conditions.html',
    'pages/tutorials.html',
    'pages/contact.html',
    'pages/payment-settings.html',
    'pages/premium.html',
    'js/job-feed.js',
    'assets/images/logos/teqtos-logo.svg'
]
for path in files:
    p = Path(path)
    text = p.read_text(encoding='utf-8')
    orig_text = text
    for old, new in replacements.items():
        text = text.replace(old, new)
    if text != orig_text:
        p.write_text(text, encoding='utf-8')
        print(f'Updated {path}')
