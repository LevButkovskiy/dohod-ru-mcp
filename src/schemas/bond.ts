import { z } from 'zod';

// Zod схема для валидации параметров инструмента getBonds
export const GetBondsParamsSchema = z.object({
	limit: z
		.number()
		.min(1)
		.max(1000)
		.optional()
		.describe(
			'Максимальное количество облигаций в ответе (по умолчанию 100)',
		),
	// Фильтры по датам
	issueDateFrom: z
		.string()
		.optional()
		.describe('Дата выпуска от (YYYY-MM-DD)'),
	issueDateTo: z.string().optional().describe('Дата выпуска до (YYYY-MM-DD)'),
	maturityDateFrom: z
		.string()
		.optional()
		.describe('Дата погашения от (YYYY-MM-DD)'),
	maturityDateTo: z
		.string()
		.optional()
		.describe('Дата погашения до (YYYY-MM-DD)'),

	// Фильтры по числовым значениям
	yearsToMaturityFrom: z.number().optional().describe('Лет до погашения от'),
	yearsToMaturityTo: z.number().optional().describe('Лет до погашения до'),
	currentYieldFrom: z
		.number()
		.optional()
		.describe('Текущая доходность от (%)'),
	currentYieldTo: z.number().optional().describe('Текущая доходность до (%)'),
	qualityFrom: z
		.number()
		.min(0)
		.max(10)
		.optional()
		.describe('Качество от (0-10)'),
	qualityTo: z
		.number()
		.min(0)
		.max(10)
		.optional()
		.describe('Качество до (0-10)'),

	// Фильтры по рейтингу
	creditRatings: z
		.array(z.string())
		.optional()
		.describe('Кредитные рейтинги (AAA, AA, A, BBB, BB, B)'),

	// Булевы фильтры
	isiis: z.boolean().optional().describe('Включить в ИИС'),
	taxFree: z.boolean().optional().describe('Освобождение от налога'),
	taxCurrencyFree: z
		.boolean()
		.optional()
		.describe('Освобождение от валютного налога'),
	taxLongtermFree: z
		.boolean()
		.optional()
		.describe('Освобождение от долгосрочного налога'),
	rutrade: z.boolean().optional().describe('Торгуется на РУТРЕЙД'),

	// Поиск по строке
	searchString: z
		.string()
		.optional()
		.describe('Поиск по названию или эмитенту'),
});

export type GetBondsParams = z.infer<typeof GetBondsParamsSchema>;
