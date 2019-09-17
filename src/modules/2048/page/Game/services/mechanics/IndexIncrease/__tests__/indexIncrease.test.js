import IndexIncrease from '../index';

describe('Index increase tests', () => {
	let xOffsetArray = [],
		yOffsetArray = [];

	let xOffsetArraySubset = [],
		xOffsetArraySubsetAfterMerge = [];

	let proportions = { width: 10, height: 20 };

	beforeEach(() => {
		xOffsetArray = [
			{ x: 0, y: 1, value: 2 },
			{ x: 3, y: 1, value: 4 },
			{ x: 4, y: 2, value: 8 },
			{ x: 1, y: 2, value: 8 },
			{ x: 2, y: 2, value: 8 },
			{ x: 2, y: 0, value: 8 }
		];

		yOffsetArray = [
			{ x: 0, y: 1, value: 2 },
			{ x: 3, y: 1, value: 4 },
			{ x: 4, y: 2, value: 8 },
			{ x: 1, y: 2, value: 8 },
			{ x: 2, y: 2, value: 8 },
			{ x: 2, y: 0, value: 8 }
		];

		xOffsetArraySubset = [
			[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
			[{ x: 1, y: 2, value: 8 }, { x: 3, y: 2, value: 8 }, { x: 4, y: 2, value: 8 }],
			[{ x: 2, y: 0, value: 8 }]
		];

		xOffsetArraySubsetAfterMerge = [
			[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
			[{ x: 1, y: 2, value: 16 }, { x: 4, y: 2, value: 8 }],
			[{ x: 2, y: 0, value: 8 }]
		];
	});

	it('General', () => {
		const indexIncreaseX = new IndexIncrease(xOffsetArray, 'x');

		expect(
			indexIncreaseX
				.subsetFormation()
				.findSameBlocksAndMerge()
				.moveToFreeSpace(proportions.width)
				.subsetIntegration()
		).toEqual([
			{ x: 9, y: 1, value: 2 },
			{ x: 10, y: 1, value: 4 },
			{ x: 9, y: 2, value: 8 },
			{ x: 10, y: 2, value: 16 },
			{ x: 10, y: 0, value: 8 }
		]);
	});

	it('Subset formation', () => {
		const indexIncreaseX = new IndexIncrease(xOffsetArray, 'x');
		expect(indexIncreaseX.subsetFormation().data).toEqual([
			[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
			[{ x: 1, y: 2, value: 8 }, { x: 2, y: 2, value: 8 }, { x: 4, y: 2, value: 8 }],
			[{ x: 2, y: 0, value: 8 }]
		]);

		const indexIncreaseY = new IndexIncrease(yOffsetArray, 'y');
		expect(indexIncreaseY.subsetFormation().data).toEqual([
			[{ x: 0, y: 1, value: 2 }],
			[{ x: 3, y: 1, value: 4 }],
			[{ x: 4, y: 2, value: 8 }],
			[{ x: 1, y: 2, value: 8 }],
			[{ x: 2, y: 0, value: 8 }, { x: 2, y: 2, value: 8 }]
		]);
	});

	it('Search and merge the same blocks', () => {
		const indexIncreaseX = new IndexIncrease(xOffsetArraySubset, 'x');
		expect(indexIncreaseX.findSameBlocksAndMerge().data).toEqual([
			[{ x: 0, y: 1, value: 2 }, { x: 3, y: 1, value: 4 }],
			[{ x: 1, y: 2, value: 8 }, { x: 4, y: 2, value: 16 }],
			[{ x: 2, y: 0, value: 8 }]
		]);
	});

	it('Moving to an empty space', () => {
		const indexIncrease = new IndexIncrease(xOffsetArraySubsetAfterMerge, 'x');

		expect(indexIncrease.moveToFreeSpace(proportions.width).data).toEqual([
			[{ x: 9, y: 1, value: 2 }, { x: 10, y: 1, value: 4 }],
			[{ x: 9, y: 2, value: 16 }, { x: 10, y: 2, value: 8 }],
			[{ x: 10, y: 0, value: 8 }]
		]);
	});

	it('Combining subsets into a single array', () => {
		const indexIncrease = new IndexIncrease(xOffsetArraySubsetAfterMerge, 'x');
		expect(indexIncrease.subsetIntegration()).toEqual([
			{ x: 0, y: 1, value: 2 },
			{ x: 3, y: 1, value: 4 },
			{ x: 1, y: 2, value: 16 },
			{ x: 4, y: 2, value: 8 },
			{ x: 2, y: 0, value: 8 }
		]);
	});
});
