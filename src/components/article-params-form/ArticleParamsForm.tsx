import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { OptionType, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, defaultArticleState } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

interface ArticleParamsFormProps {
	fontFamily: OptionType;
	setFontFamily: (option: OptionType) => void;
	fontSize: OptionType;
	setFontSize: (option: OptionType) => void;
	fontColor: OptionType;
	setFontColor: (option: OptionType) => void;
	backgroundColor: OptionType;
	setBackgroundColor: (option: OptionType) => void;
	contentWidth: OptionType;
	setContentWidth: (option: OptionType) => void;
}


export const ArticleParamsForm = ({
	fontFamily,
	setFontFamily,
	fontSize,
	setFontSize,
	fontColor,
	setFontColor,
	backgroundColor,
	setBackgroundColor,
	contentWidth,
	setContentWidth
}: ArticleParamsFormProps) => {

	// Локальные состояния для параметров
	const [localFontFamily, setLocalFontFamily] = useState(fontFamily);
	const [localFontSize, setLocalFontSize] = useState(fontSize);
	const [localFontColor, setLocalFontColor] = useState(fontColor);
	const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);
	const [localContentWidth, setLocalContentWidth] = useState(contentWidth);


	//Состояние сайдбара
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const handleToggleSidebar = () => {
		setSidebarOpen(prevState => !prevState); // Переключаем состояние
	};
	//Выбор фонового цвета
	const handleBackgroundColorChange = (selectedBackgroundColor: OptionType) => {
		setLocalBackgroundColor(selectedBackgroundColor);
	};
	//Выбор цвета шрифта
	const handleFontColorChange = (selectedColorFont: OptionType) => {
		setLocalFontColor(selectedColorFont);
	};
	//Выбор шрифта
	const handleFontChange = (selectedOption: OptionType) => {
		setLocalFontFamily(selectedOption);
	};
	//Выбор размера шрифта
	const handleFontSizeChange = (selectedSizeFont: OptionType) => {
		setLocalFontSize(selectedSizeFont); 
	};
	//Выбор ширины контейнера
	const handleContentWidthChange = (selectedContentWidth: OptionType) => {
		setLocalContentWidth(selectedContentWidth); 
	};

	const handleReset = () => {
		// Приводим состояния к значениям по умолчанию
		setLocalBackgroundColor(defaultArticleState.backgroundColor);
		setLocalFontColor(defaultArticleState.fontColor);
		setLocalFontFamily(fontFamilyOptions[0]);
		setLocalFontSize(defaultArticleState.fontSizeOption);
		setLocalContentWidth(defaultArticleState.contentWidth);
	};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Применяем состояния
		setBackgroundColor(localBackgroundColor);
		setFontColor(localFontColor);
		setFontFamily(localFontFamily);
		setFontSize(localFontSize);
		setContentWidth(localContentWidth);

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
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={handleToggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text
						size={31}
						uppercase
						weight={800}>Задайте параметры</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={handleFontChange}
						title="Шрифт"
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						name='fontSize'
						onChange={handleFontSizeChange}
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={handleFontColorChange}
						title="Цвет шрифта"
					/>
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={handleBackgroundColorChange}
						title="Цвет фона"
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={handleContentWidthChange}
						title="Ширина контена"
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
