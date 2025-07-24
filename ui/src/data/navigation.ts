import { TranslationKey } from '@/lib/i18n';

interface NavigationItem {
	titleKey: TranslationKey;
	href: string;
	items?: {
		titleKey: TranslationKey;
		href: string;
		descriptionKey: TranslationKey;
	}[];
}

interface NavigationData {
	brand: {
		name: string;
		href: string;
	};
	mainNav: NavigationItem[];
	userMenu: {
		titleKey: TranslationKey;
		href: string;
	}[];
}

const navigationData: NavigationData = {
	brand: {
		name: "FrenCircle",
		href: "/"
	},
	mainNav: [
		{
			titleKey: "home",
			href: "/"
		},
		{
			titleKey: "about",
			href: "/about"
		}
	],
	userMenu: [
		{
			titleKey: "login",
			href: "/"
		},
		{
			titleKey: "faq",
			href: "/about/faq"
		}
	]
};

export default navigationData;
