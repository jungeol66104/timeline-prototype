let events = [
	{
		id: 0,
		date: "1792/01/01",
		name: "버튼우즈 협정",
		rank: "major",
	},
	{
		id: 1,
		date: "1907/01/01",
		name: "1907 대공황",
		rank: "major",
	},
	{
		id: 2,
		date: "1913/01/01",
		name: "연방준비제도 신설",
		rank: "major",
	},
	{
		id: 3,
		date: "1929/01/01",
		name: "1929 주식시장 붕괴",
		rank: "major",
	},
	{
		id: 4,
		date: "1933/01/01",
		name: "글래스-스티걸 법안 발의",
		rank: "major",
	},
	{
		id: 5,
		date: "1944/01/01",
		name: "브레튼우즈 협정",
		rank: "major",
	},
	{
		id: 6,
		date: "1971/01/01",
		name: "닉슨 쇼크",
		rank: "major",
	},
	{
		id: 7,
		date: "1987/01/01",
		name: "블랙 먼데이",
		rank: "major",
	},
	{
		id: 8,
		date: "2000/01/01",
		name: "닷컴 버블",
		rank: "major",
	},
	{
		id: 9,
		date: "2008/01/01",
		name: "글로벌 금융위기",
		rank: "major",
	},
];

export default events;

export interface Event {
	id: number;
	date: string;
	name: string;
	rank: string;
}
