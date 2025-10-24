import { GetBondsParams } from '../schemas/bond';

// Функция для создания FormData с фильтрами
export function createBondsFormData(params: GetBondsParams): URLSearchParams {
	const formData = new URLSearchParams();

	// Добавляем фильтры по датам
	if (params.issueDateFrom) {
		formData.append(
			'customFilters[issue_date][from]',
			params.issueDateFrom,
		);
	}
	if (params.issueDateTo) {
		formData.append(
			'customFilters[issue_date][to]',
			params.issueDateTo,
		);
	}
	if (params.maturityDateFrom) {
		formData.append(
			'customFilters[matdate][from]',
			params.maturityDateFrom,
		);
	}
	if (params.maturityDateTo) {
		formData.append(
			'customFilters[matdate][to]',
			params.maturityDateTo,
		);
	}

	// Добавляем фильтры по числовым значениям
	if (params.yearsToMaturityFrom !== undefined) {
		formData.append(
			'customFilters[years_to_maturity][from]',
			params.yearsToMaturityFrom.toString(),
		);
	}
	if (params.yearsToMaturityTo !== undefined) {
		formData.append(
			'customFilters[years_to_maturity][to]',
			params.yearsToMaturityTo.toString(),
		);
	}
	if (params.currentYieldFrom !== undefined) {
		formData.append(
			'customFilters[current_yield][from]',
			params.currentYieldFrom.toString(),
		);
	}
	if (params.currentYieldTo !== undefined) {
		formData.append(
			'customFilters[current_yield][to]',
			params.currentYieldTo.toString(),
		);
	}
	if (params.qualityFrom !== undefined) {
		formData.append(
			'customFilters[quality][from]',
			params.qualityFrom.toString(),
		);
	}
	if (params.qualityTo !== undefined) {
		formData.append(
			'customFilters[quality][to]',
			params.qualityTo.toString(),
		);
	}

	// Добавляем фильтры по рейтингу
	if (params.creditRatings && params.creditRatings.length > 0) {
		params.creditRatings.forEach((rating) => {
			formData.append(
				'customFilters[credit_rating_text][]',
				rating,
			);
		});
	}

	// Добавляем булевы фильтры
	if (params.isiis !== undefined) {
		formData.append(
			'customFilters[isiis]',
			params.isiis ? '1' : '0',
		);
	}
	if (params.taxFree !== undefined) {
		formData.append(
			'customFilters[tax_free]',
			params.taxFree ? '1' : '0',
		);
	}
	if (params.taxCurrencyFree !== undefined) {
		formData.append(
			'customFilters[tax_currency_free]',
			params.taxCurrencyFree ? '1' : '0',
		);
	}
	if (params.taxLongtermFree !== undefined) {
		formData.append(
			'customFilters[tax_longterm_free]',
			params.taxLongtermFree ? '1' : '0',
		);
	}
	if (params.rutrade !== undefined) {
		formData.append(
			'customFilters[rutrade]',
			params.rutrade ? '1' : '0',
		);
	}

	// Добавляем поиск по строке
	if (params.searchString) {
		formData.append(
			'customFilters[search_string]',
			params.searchString,
		);
	}

	return formData;
}
