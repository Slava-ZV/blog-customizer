import { createRoot } from 'react-dom/client';
import { useState, StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';
import { App } from './components/app/App';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from './constants/articleProps';


import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState<OptionType>(fontFamilyOptions[0])
	const [fontSize, setFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);
	
	return (
		<main
			className={clsx(styles.main)}
			style={
				    {
				     '--font-family': fontFamily.value,
				     '--font-size': fontSize.value,
				     '--font-color': fontColor.value,
				     '--container-width': contentWidth.value,
				     '--bg-color': backgroundColor.value,
				    } as CSSProperties
			    }>
			<ArticleParamsForm
			fontFamily={fontFamily}
			setFontFamily={setFontFamily}
			fontSize={fontSize}
			setFontSize={setFontSize}
			fontColor={fontColor}
			setFontColor={setFontColor}
			backgroundColor={backgroundColor}
			setBackgroundColor={setBackgroundColor}
			contentWidth={contentWidth}
			setContentWidth={setContentWidth}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
