import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from './icons/SearchIcon';
import { GiftIcon } from './icons/GiftIcon';
import s from './styles.module.css';

const Home = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState<string>('');

	const isGifted = localStorage.getItem('gifted') === 'true';
	const [gifted, setGifted] = useState<boolean>(isGifted);

	interface Content {
		wordOfTheDay: string;
		readAs: string;
		type: string;
		meanings: string[];
		forYou: string[];
	}

	const content: Content = {
		wordOfTheDay: gifted ? 'значимый' : 'убожество',
		readAs: gifted ? '/ зна́-чи-мый /' : '/ у·бо́-же-ство /',
		type: gifted ? 'прилагательное' : 'существительное',
		meanings: gifted
			? ['важный по значению; значительный', 'обладающий значением, смыслом']
			: [
					'свойство по значению прилагательного убогий; жалкое, ничтожное состояние, скудость',
					'перен. нечто жалкое; ничтожество',
					'устар. увечье, физический недостаток',
			  ],
		forYou: gifted
			? [
					'уверенный',
					'сильный',
					'ответственный',
					'разносторонний',
					'мудрый',
					'харизматичный',
					'личность',
					'профи',
					'талант',
					'самодостаточный',
					'осознанный',
					'успешный',
			  ]
			: [
					'бездарность',
					'ничтожество',
					'никчёмность',
					'бесполезный',
					'пустышка',
					'бесперспективный',
					'посредственность',
					'неудачник',
					'провал',
					'тряпка',
					'невыразительный',
					'незаметный',
			  ],
	};

	const gift = (state: boolean) => {
		setGifted(state);
		localStorage.setItem('gifted', String(state));
	};

	return (
		<main className={s.main}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					navigate(`/word/${value}`);
				}}
			>
				<div className="heading">
					<h1>Словарь</h1>
					<button className="grey" onClick={() => navigate('/abc')}>
						{gifted
							? 'Слишком рано для слов? Попробуй букварь!'
							: 'Слишком тупой для значений слов? Ссылка на букварь здесь'}
					</button>
				</div>
				<div className={s.input}>
					<input
						type="text"
						name="input"
						placeholder="Найти слово"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						minLength={1}
						maxLength={50}
						required
					/>
					<button type="submit">
						<SearchIcon />
					</button>
				</div>
			</form>

			<section className={`${s.wordOfTheDay} sect`}>
				<h3>Слово Дня</h3>
				<div>
					<h2>{content.wordOfTheDay}</h2>
					<p className="grey">{content.readAs}</p>
				</div>
				<p className="italic">{content.type}</p>
				<ul>
					{content.meanings.map((meaning) => (
						<li key={meaning}>{meaning}</li>
					))}
					<li>ты 🫵🏻</li>
				</ul>
			</section>

			<section className={`${s.forYou} sect`}>
				<h3>Подборка Для Вас</h3>
				<ul>
					{content.forYou.map((word) => (
						<li key={word}>
							<button onClick={() => navigate(`/word/${word}`)}>{word}</button>
						</li>
					))}
				</ul>
			</section>

			{!gifted && (
				<section onClick={() => gift(true)} className={`${s.open} sect`}>
					<GiftIcon />
					<p>Открыть подарок</p>
				</section>
			)}
			{gifted && (
				<section className={`${s.gift} sect`}>
					<GiftIcon />
					<p>
						С днём рождения, сильная, харизматичная, по-настоящему ценная
						личность! Ты — не просто самодостаточный человек, ты — творец,
						мастер, талант, который вдохновляет. Пусть в тебе всегда будет
						уверенность, глубина, и та самая внутренняя сила духа, что делает
						тебя значимым и успешным. Оставайся мудрым, ответственным,
						осознанным и ярким — не пустышкой, а человеком, которого видно и
						слышно. Мир счастлив, что ты в нём.
					</p>
					<p className="grey">Артемию от От UwU Pickme</p>
					<button onClick={() => gift(false)} className="grey underline">
						Какой ужас, верни обратно 🤢🤢🤢
					</button>
				</section>
			)}

			<button
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className="grey underline"
			>
				Вернуться наверх
			</button>
		</main>
	);
};

export default Home;
