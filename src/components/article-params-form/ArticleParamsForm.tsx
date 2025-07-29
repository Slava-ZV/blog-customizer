import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
	title: string;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	title,
}: ArticleParamsFormProps) => {
	// Состояния для параметров
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	//Состояние контейнера (сайдбара)
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const handleToggleSidebar = () => {
		setSidebarOpen((prevState) => !prevState); // Переключаем состояние
	};

	const handleReset = () => {
		// Сбрасываем локальные состояния к значениям по умолчанию
		setArticleState(defaultArticleState),
			setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		handleToggleSidebar();
	};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Применяем локальные состояния к родительским состояниям
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
		handleToggleSidebar();
	};

	const ref = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: ref,
		onClose: () => setSidebarOpen(false),
	});

	return (
		<div ref={ref}>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} uppercase weight={800}>
						{title}
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						name='fontSize'
						onChange={setFontSize}
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
						title='Цвет шрифта'
					/>
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
						title='Ширина контена'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
