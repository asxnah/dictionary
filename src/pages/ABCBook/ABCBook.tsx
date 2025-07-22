import { useNavigate } from 'react-router-dom';
import s from './styles.module.css';

const ABCBook = () => {
	const naviagte = useNavigate();

	interface ABC {
		letter: string;
		readAs: string;
	}

	const abc: ABC[] = [
		{ letter: 'А', readAs: 'А' },
		{ letter: 'Б', readAs: 'Бэ' },
		{ letter: 'В', readAs: 'Вэ' },
		{ letter: 'Г', readAs: 'Гэ' },
		{ letter: 'Д', readAs: 'Дэ' },
		{ letter: 'Е', readAs: 'Е' },
		{ letter: 'Ё', readAs: 'Ё' },
		{ letter: 'Ж', readAs: 'Жэ' },
		{ letter: 'З', readAs: 'Зэ' },
		{ letter: 'И', readAs: 'И' },
		{ letter: 'Й', readAs: 'И краткое' },
		{ letter: 'К', readAs: 'Ка' },
		{ letter: 'Л', readAs: 'Эль' },
		{ letter: 'М', readAs: 'Эм' },
		{ letter: 'Н', readAs: 'Эн' },
		{ letter: 'О', readAs: 'О' },
		{ letter: 'П', readAs: 'Пэ' },
		{ letter: 'Р', readAs: 'Эр' },
		{ letter: 'С', readAs: 'Эс' },
		{ letter: 'Т', readAs: 'Тэ' },
		{ letter: 'У', readAs: 'У' },
		{ letter: 'Ф', readAs: 'Эф' },
		{ letter: 'Х', readAs: 'Ха' },
		{ letter: 'Ц', readAs: 'Цэ' },
		{ letter: 'Ч', readAs: 'Че' },
		{ letter: 'Ш', readAs: 'Ша' },
		{ letter: 'Щ', readAs: 'Ща' },
		{ letter: 'Ъ', readAs: 'Твёрдый знак' },
		{ letter: 'Ы', readAs: 'Ы' },
		{ letter: 'Ь', readAs: 'Мягкий знак' },
		{ letter: 'Э', readAs: 'Э' },
		{ letter: 'Ю', readAs: 'Ю' },
		{ letter: 'Я', readAs: 'Я' },
	];

	return (
		<main className={s.main}>
			<div>
				<button onClick={() => naviagte('/')} className="grey underline">
					↩ На главную
				</button>
				<h1>Букварь</h1>
				{localStorage.getItem('gifted') === 'true' ? (
					<p>Для начинающих</p>
				) : (
					<p>Для самых тупых</p>
				)}
			</div>
			<ul>
				{abc.map((item) => (
					<li className="sect" key={item.letter}>
						<p>{item.letter}</p>
						<p className="grey">{item.readAs}</p>
					</li>
				))}
			</ul>

			<button
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className="grey underline"
			>
				Вернуться наверх
			</button>
		</main>
	);
};

export default ABCBook;
