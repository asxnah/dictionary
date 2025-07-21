import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import data from './words.json';
import s from './styles.module.css';

const Word = () => {
	interface ApiResponse {
		head: Record<string, unknown>;
		def: Definition[];
	}
	interface Definition {
		text: string;
		pos: string;
		tr: Translation[];
	}
	interface Translation {
		text: string;
		pos: string;
		syn?: Synonym[];
		mean?: Meaning[];
		ex?: Example[];
	}
	interface Synonym {
		text: string;
	}
	interface Meaning {
		text: string;
	}
	interface Example {
		text: string;
		tr: TranslationExample[];
	}
	interface TranslationExample {
		text: string;
	}

	const navigate = useNavigate();

	const { param } = useParams<{ param: string }>();
	const normalizedParam = param && param.toLowerCase();

	const [localResult, setLocalResult] = useState<
		(typeof data)[keyof typeof data] | null
	>(null);

	const [result, setResult] = useState<ApiResponse | null>(null);
	const key = import.meta.env.VITE_YANDEX_API_KEY;

	useEffect(() => {
		if (!normalizedParam) return;

		if (data[normalizedParam as keyof typeof data]) {
			setLocalResult(data[normalizedParam as keyof typeof data]);
		} else {
			setLocalResult(null);
			getWord(normalizedParam);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [normalizedParam]);

	const getWord = async (word: string) => {
		try {
			const fetchedWord = await axios.get(
				`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=ru-ru&text=${word}`
			);
			setResult(fetchedWord.data);
		} catch (e) {
			console.debug(e);
		}
	};

	return (
		<main className={s.main}>
			{localResult && (
				<>
					<section className={s.word}>
						<button onClick={() => navigate('/')} className="grey underline">
							↩ На главную
						</button>
						<h1>{normalizedParam}</h1>
						<p className="grey">{localResult.readAs}</p>
					</section>
					<section className={`${s.meaning} sect`}>
						<h2>Значение</h2>
						<ol>
							{localResult.meanings.map((item) => (
								<li key={item.meaning}>
									<span>{item.meaning.toLowerCase()}</span>
									<span className="grey">{item.example}</span>
								</li>
							))}
						</ol>
					</section>
					<section className={`${s.nyms} sect`}>
						<div>
							<h3>Синонимы</h3>
							<ul>
								{localResult.synonyms.map((synonym) => (
									<li key={synonym}>
										<button onClick={() => navigate(`/word/${synonym}`)}>
											{synonym.toLowerCase()}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Антонимы</h3>
							<ul>
								{localResult.antonyms.map((antonym) => (
									<li key={antonym}>
										<button onClick={() => navigate(`/word/${antonym}`)}>
											{antonym.toLowerCase()}
										</button>
									</li>
								))}
							</ul>
						</div>
					</section>
				</>
			)}

			{result && (
				<>
					<section className={s.word}>
						<button onClick={() => navigate('/')} className="grey underline">
							↩ На главную
						</button>
						<h1>
							{result.def?.[0]?.text
								? result.def?.[0]?.text
								: 'Такого слова в русском языке не существует'}
						</h1>
					</section>
					<section className={`${s.meaning} sect`}>
						<h2>Значение</h2>
						<ol>
							{result.def?.[0]?.tr?.map((item) => (
								<li key={item.text}>
									<span>{item.text?.toLowerCase()}</span>
								</li>
							)) || <li>Тебе словарь для чего?</li>}
						</ol>
					</section>
					<section className={`${s.synonyms} sect`}>
						<h3>Синонимы</h3>
						<ul>
							{result.def?.[0]?.tr?.[0]?.syn?.map((synonym) => (
								<li key={synonym.text}>
									<button onClick={() => navigate(`/word/${synonym.text}`)}>
										{synonym.text.toLowerCase()}
									</button>
								</li>
							)) || <li>-</li>}
						</ul>
					</section>
				</>
			)}

			<button
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className="grey underline"
			>
				Наверх
			</button>
		</main>
	);
};

export default Word;
