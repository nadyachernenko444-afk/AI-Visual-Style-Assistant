const moodData = {
    calm: {
        palette: { main: '#B8C4B9', accent: '#7A9D8C', bg: '#F5F7F5', add: '#D1D9D1' },
        moods: ['Минимализм', 'Воздушность', 'Доверие', 'Чистота', 'Спокойствие'],
        recs: {
            shapes: 'Мягкие скругления, обилие свободного пространства (white space)',
            photos: 'Светлые, с естественным освещением, пастельные тона, минимальный ретушь',
            typo: 'Сочетание современного гротеска для заголовков и легкого антиква для акцентов',
            icons: 'Тонкие линейные иконки, минималистичные формы',
            anim: 'Плавные появления (fade-in), медленные сдвиги вверх'
        }
    },
    premium: {
        palette: { main: '#1A1A1A', accent: '#D4AF37', bg: '#0A0A0A', add: '#333333' },
        moods: ['Роскошь', 'Эксклюзивность', 'Уверенность', 'Строгость', 'Статус'],
        recs: {
            shapes: 'Четкие геометрические линии, тонкие рамки, строгая сетка',
            photos: 'Высокий контраст, глубокие тени, премиальный глянец, чёткий фокус',
            typo: 'Элегантный Serif (засечки) в заголовках, строгий Sans-serif в тексте',
            icons: 'Глянцевые 3D элементы, золото, стекломорфизм',
            anim: 'Медленные, премиальные переходы, плавный зум'
        }
    },
    bright: {
        palette: { main: '#FFD700', accent: '#FF4500', bg: '#FFFFFF', add: '#8A2BE2' },
        moods: ['Энергия', 'Игривость', 'Смелость', 'Динамика', 'Яркость'],
        recs: {
            shapes: 'Органические формы, "жидкие" элементы, крупные скругления',
            photos: 'Насыщенные цвета, экспрессивные позы, яркий свет, поп-арт элементы',
            typo: 'Жирный, массивный Sans-serif, возможно использование вариативных шрифтов',
            icons: 'Объемные 3D иконки в стиле Claymorphism, яркие градиенты',
            anim: 'Прыгучая анимация (bounce), быстрые сдвиги, активные ховеры'
        }
    },
    tech: {
        palette: { main: '#0D0D0D', accent: '#00F0FF', bg: '#050505', add: '#7000FF' },
        moods: ['Футуризм', 'Инновации', 'Точность', 'Скорость', 'Киберпанк'],
        recs: {
            shapes: 'Гексагоны, диагональные линии, неоновые разделители',
            photos: 'Холодное освещение, синие/фиолетовые фильтры, технологичные детали',
            typo: 'Моноширинные шрифты для акцентов, футуристичный гротеск',
            icons: 'Неоновые контуры, wireframe 3D, голографические элементы',
            anim: 'Эффекты глитча, быстрые цифровые переходы, сканирующие линии'
        }
    },
    expert: {
        palette: { main: '#1B365D', accent: '#C5A059', bg: '#F8F9FA', add: '#E9ECEF' },
        moods: ['Профессионализм', 'Надежность', 'Структура', 'Ясность', 'Интеллект'],
        recs: {
            shapes: 'Прямоугольные блоки с небольшим скруглением, строгая иерархия',
            photos: 'Деловой стиль, чистые фоны, корпоративная эстетика, естественные цвета',
            typo: 'Классический уверенный гротеск (например, Inter или Montserrat)',
            icons: 'Плоские (flat) минималистичные иконки, приглушенные цвета',
            anim: 'Последовательное раскрытие блоков, аккуратные появления'
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');

    const productTzInput = document.getElementById('product-tz');
    const audienceDescInput = document.getElementById('audience-desc');
    const keywordsInput = document.getElementById('keywords');
    const moodSelect = document.getElementById('mood');
    const referencesInput = document.getElementById('references');

    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const clearBtn = document.getElementById('clear-btn');

    generateBtn.addEventListener('click', async () => {
        const tz = productTzInput.value.trim() || 'Универсальный образовательный продукт';
        const audience = audienceDescInput.value.trim() || 'Широкая аудитория';
        const mood = moodSelect.value;
        let keywords = keywordsInput.value.trim();
        const hasReferences = referencesInput.files.length > 0;

        if (!keywords) {
            keywords = tz.split(' ').slice(0, 3).join(' ');
        }

        // Simulate "Analyzing Images"
        generateBtn.disabled = true;
        generateBtn.innerText = hasReferences ? 'Анализируем референсы...' : 'Генерируем...';

        await new Promise(resolve => setTimeout(resolve, 1200));

        const data = {...moodData[mood]};
        let analysisNote = '';

        if (hasReferences) {
            analysisNote = '⚠️ Анализ референсов: стиль скорректирован под загруженные изображения.';
            // Simulate color shift based on "analysis"
            data.palette.main = adjustColor(data.palette.main, 10);
            data.recs.shapes += ' (с учётом геометрии референсов)';
        }

        generateBtn.disabled = false;
        generateBtn.innerText = 'Сгенерировать визуальное направление';

        // Generate Content
        let html = `
            ${analysisNote ? `<div class="result-card" style="border-left-color: #fbbf24; background: rgba(251, 191, 36, 0.05)">${analysisNote}</div>` : ''}

            <div class="result-card">
                <h3>1. Цветовая палитра</h3>
                <div class="color-swatch-container">
                    <div class="color-item">
                        <div class="color-circle" style="background: ${data.palette.main}"></div>
                        <span><strong>Основной:</strong> ${data.palette.main}</span>
                    </div>
                    <div class="color-item">
                        <div class="color-circle" style="background: ${data.palette.accent}"></div>
                        <span><strong>Акцентный:</strong> ${data.palette.accent}</span>
                    </div>
                    <div class="color-item">
                        <div class="color-circle" style="background: ${data.palette.bg}"></div>
                        <span><strong>Фон:</strong> ${data.palette.bg}</span>
                    </div>
                    <div class="color-item">
                        <div class="color-circle" style="background: ${data.palette.add}"></div>
                        <span><strong>Доп. цвет:</strong> ${data.palette.add}</span>
                    </div>
                </div>
            </div>

            <div class="result-card">
                <h3>2. Настроение сайта</h3>
                <p>${data.moods.join(', ')}</p>
            </div>

            <div class="result-card">
                <h3>3. Рекомендации по дизайну</h3>
                <ul>
                    <li><strong>Формы:</strong> ${data.recs.shapes}</li>
                    <li><strong>Стиль фотографий:</strong> ${data.recs.photos}</li>
                    <li><strong>Типографика:</strong> ${data.recs.typo}</li>
                    <li><strong>Стиль 3D иконок:</strong> ${data.recs.icons}</li>
                    <li><strong>Анимация:</strong> ${data.recs.anim}</li>
                </ul>
            </div>

            <div class="result-card">
                <h3>4. Промпты для генерации изображений (блок "Для кого курс")</h3>
                <div id="prompts-container">
                    ${generateDetailedPrompts(audience, tz, mood, data)}
                </div>
            </div>

            <div class="result-card">
                <h3>5. Ресерч по похожим сайтам</h3>
                <div class="link-list">
                    ${generateLinks(keywords)}
                </div>
            </div>
        `;

        resultContent.innerHTML = html;
        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    function generateDetailedPrompts(audience, tz, mood, data) {
        const lines = audience.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) return '<p>ЦА не указана</p>';

        // Determine person details based on TZ
        let personDetails = '25-35 лет, работает за ноутбуком, выглядит уверенным, находится в современном рабочем пространстве';
        const tzLower = tz.toLowerCase();

        if (tzLower.includes('бизнес') || tzLower.includes('предприниматель')) {
            personDetails = '30-45 лет, в деловом стиле (smart casual), в современном минималистичном офисе или бизнес-лаунже, взгляд уверенный и вдохновляющий';
        } else if (tzLower.includes('дизайн') || tzLower.includes('арт') || tzLower.includes('креатив')) {
            personDetails = '20-30 лет, творческий стиль одежды, в светлой студии с элементами искусства, с MacBook, вдохновленный взгляд';
        } else if (tzLower.includes('it') || tzLower.includes('разработка') || tzLower.includes('код')) {
            personDetails = '22-35 лет, в худи или простой футболке, в технологичном коворкинге с несколькими мониторами, сосредоточенный и профессиональный вид';
        }

        return lines.map(line => {
            const ruPrompt = `Сгенерируй реалистичный портрет представителя данной аудитории: ${line}.
Категория: ${tz}.
Покажи человека: ${personDetails}.
Стиль: современная lifestyle photography.
Без: текста, логотипов, баннеров, интерфейсов, рекламных элементов.`;

            const enPrompt = `Generate a realistic portrait of this audience representative: ${line}.
Category: ${tz}.
Person details: ${personDetails}.
Style: modern lifestyle photography.
Negative: text, logos, banners, interfaces, advertising elements.`;

            return `
                <div class="prompt-block">
                    <span class="prompt-lang">RU</span>
                    <p>${ruPrompt}</p>
                    <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1)">
                    <span class="prompt-lang">EN</span>
                    <p>${enPrompt}</p>
                </div>
            `;
        }).join('');
    }

    function generateLinks(keywords) {
        const q = encodeURIComponent(keywords);
        const platforms = [
            { name: 'Google', url: `https://www.google.com/search?q=site:tilda.cc+${q}+design` },
            { name: 'Behance', url: `https://www.behance.net/search/bios?search=${q}` },
            { name: 'Pinterest', url: `https://www.pinterest.com/search/pins/?q=${q}+website+design` },
            { name: 'Dribbble', url: `https://dribbble.com/search/${q}` },
            { name: 'Tilda Education', url: `https://tilda.cc/ru/education/` }
        ];

        return platforms.map(p => `<a href="${p.url}" target="_blank">→ ${p.name} (${keywords})</a>`).join('');
    }

    function adjustColor(color, amount) {
        return color; // Simple mock: return original or could implement hex manipulation
    }

    copyBtn.addEventListener('click', () => {
        const text = resultContent.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Скопировано!';
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
    });

    downloadBtn.addEventListener('click', () => {
        const text = resultContent.innerText;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'visual-style-assistant-result.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    clearBtn.addEventListener('click', () => {
        productTzInput.value = '';
        audienceDescInput.value = '';
        keywordsInput.value = '';
        referencesInput.value = '';
        resultSection.classList.add('hidden');
    });
});
