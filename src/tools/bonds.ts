import axios from 'axios';
import { createBondsFormData } from '../lib/bond';
import { GetBondsParams, GetBondsParamsSchema } from '../schemas/bond';
import { Bond } from '../types/bond';

export const getBondsTool = {
	name: 'getBonds',
	description:
		'Получает список облигаций с сайта dohod.ru с поддержкой фильтрации по различным параметрам',
	parameters: GetBondsParamsSchema,
	execute: async (args: unknown) => {
		const params = args as GetBondsParams;
		try {
			const url =
				'https://www.dohod.ru/assets/components/dohodbonds/connectorweb.php?action=info';

			// Создаем FormData с фильтрами
			const formData = createBondsFormData(params);

			const response = await axios.post(url, formData, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
				},
				timeout: 10000,
			});

			if (response.status !== 200) {
				throw new Error(`HTTP Error: ${response.status}`);
			}

			// Парсим JSON ответ
			const bonds: Bond[] = response.data;

			if (!Array.isArray(bonds)) {
				throw new Error('Неверный формат ответа от сервера');
			}

			// Ограничиваем количество результатов
			const limit = params.limit || 100;
			const filteredBonds = bonds.slice(0, limit);

			// Форматируем результат
			return (
				`Найдено ${filteredBonds.length} облигаций из ${bonds.length} общих.\n\n` +
				`Список облигаций:\n${filteredBonds
					.map(
						(bond, index) =>
							`${index + 1}. ${bond.name} (${bond.xml_isin})\n` +
							`   Эмитент: ${bond.emitent}\n` +
							`   Доходность: ${parseFloat(
								bond.current_yield,
							).toFixed(2)}%\n` +
							`   Цена: ${bond.price} ${bond.currency}\n` +
							`   Купон: ${bond.coupon}%\n` +
							`   Погашение: ${bond.maturity_date} (${parseFloat(
								bond.years_to_maturity,
							).toFixed(1)} лет)\n` +
							`   Рейтинг: ${bond.credit_rating_text}\n` +
							`   Сектор: ${bond.sector_text}\n`,
					)
					.join('\n')}`
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Неизвестная ошибка';
			throw new Error(
				`Ошибка при получении данных об облигациях: ${errorMessage}`,
			);
		}
	},
};
