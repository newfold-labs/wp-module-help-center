/* eslint-disable @wordpress/i18n-no-flanking-whitespace */
import { __, sprintf } from '@wordpress/i18n';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ReactComponent as FooterBackground } from '../icons/footer.svg';
import { waitForRuntime } from '../utils';

/**
 * Translatable support message template.
 * Placeholders: %1$s = account name, %2$s = phone link HTML, %3$s = chat link HTML.
 */
const SUPPORT_MESSAGE_TEMPLATE = __(
	'If you need help with your %1$s account, give us a call at %2$s or %3$s with one of our support agents — we\'re here for you!',
	'wp-module-help-center'
);

/**
 * Brand-specific footer configuration.
 * Keys match window.NewfoldRuntime.plugin.brand (base brand, e.g. 'bluehost', 'hostgator').
 */
const BRAND_FOOTER_CONFIG = {
	bluehost: {
		contactUrl: 'https://www.bluehost.com/contact',
		phone: '8884014678',
		phoneDisplay: '888-401-4678',
		accountName: __('Bluehost', 'wp-module-help-center'),
		showProDesignBanner: true,
		proDesignUrl: 'https://www.bluehost.com/pro-design-live',
		proDesignHeading: __(
			'Your dream site is just a click away.',
			'wp-module-help-center'
		),
		proDesignSubheading: __(
			"Let's build a site you love, together.",
			'wp-module-help-center'
		),
		proDesignBody: __(
			'With Pro Design Live, our expert team bring your vision to life. We help you to create the site you\'ve always dreamed of — tailored to your goals, ready to perform.',
			'wp-module-help-center'
		),
		proDesignCta: __('Start Now', 'wp-module-help-center'),
	},
	hostgator: {
		contactUrl: 'https://www.hostgator.com/contact',
		phone: '8669642867',
		phoneDisplay: '866-964-2867',
		accountName: __('HostGator', 'wp-module-help-center'),
		showProDesignBanner: false,
	},
};

const Footer = () => {
	const { disliked, noResult } = useSelector((state) => state.helpcenter);
	const [brand, setBrand] = useState('bluehost');
	const [contactUrl, setContactUrl] = useState(
		BRAND_FOOTER_CONFIG.bluehost.contactUrl
	);
	const [proDesignUrl, setProDesignUrl] = useState(
		BRAND_FOOTER_CONFIG.bluehost.proDesignUrl
	);

	useEffect(() => {
		let utmInterval;

		waitForRuntime(5000)
			.then((runtime) => {
				const brandKey =
					runtime.plugin?.brand?.split('-')[0] || 'bluehost';
				const footerConfig =
					BRAND_FOOTER_CONFIG[brandKey] ||
					BRAND_FOOTER_CONFIG.bluehost;
				setBrand(brandKey);

				const applyUtmIfAvailable = () => {
					if (
						window.NewfoldRuntime?.linkTracker?.addUtmParams instanceof
						Function
					) {
						setContactUrl(
							window.NewfoldRuntime.linkTracker.addUtmParams(
								footerConfig.contactUrl
							)
						);
						if (footerConfig.showProDesignBanner && footerConfig.proDesignUrl) {
							setProDesignUrl(
								window.NewfoldRuntime.linkTracker.addUtmParams(
									footerConfig.proDesignUrl
								)
							);
						}
						if (utmInterval) clearInterval(utmInterval);
					}
				};

				if (
					window.NewfoldRuntime?.linkTracker?.addUtmParams instanceof
					Function
				) {
					applyUtmIfAvailable();
				} else {
					setContactUrl(footerConfig.contactUrl);
					if (footerConfig.showProDesignBanner && footerConfig.proDesignUrl) {
						setProDesignUrl(footerConfig.proDesignUrl);
					}
					utmInterval = setInterval(applyUtmIfAvailable, 200);
				}
			})
			.catch(() => {
				setBrand('bluehost');
			});

		return () => {
			if (utmInterval) clearInterval(utmInterval);
		};
	}, []);

	const footerConfig =
		BRAND_FOOTER_CONFIG[brand] || BRAND_FOOTER_CONFIG.bluehost;

	const supportMessage = sprintf(
		SUPPORT_MESSAGE_TEMPLATE,
		footerConfig.accountName,
		`<a href="tel:${footerConfig.phone}">${footerConfig.phoneDisplay}</a>`,
		`<a href="${contactUrl}" target="_blank" rel="noreferrer">${__('Chat Live', 'wp-module-help-center')}</a>`
	);

	return (
		<div className="nfd-hc-modal__footer">
			<div className="helpcenter-supportinfo__wrapper">
				{!disliked && !noResult && (
					<>
						<hr className="helpcenter-supportinfo__breakline" />
						<div className="helpcenter-supportinfo__text">
							<p className="helpcenter-supportinfo__text--heading">
								{__('Account Support', 'wp-module-help-center')}
							</p>
							<p
								className="helpcenter-supportinfo__text--body"
								dangerouslySetInnerHTML={{ __html: supportMessage }}
							/>
						</div>
					</>
				)}
			</div>
			{footerConfig.showProDesignBanner && (
				<div className="hc-banner__wrapper">
					<div className="hc-banner">
						<div className="hc-banner-content">
							<p className="hc-banner-content__heading">
								{footerConfig.proDesignHeading}
								<br />
								{footerConfig.proDesignSubheading}
							</p>
							<p className="hc-banner-content__body">
								{footerConfig.proDesignBody}
							</p>
							<div className="hc-banner-content__cta">
								<a
									data-action="load-nfd-ctb"
									data-ctb-id="838cc912-adb3-4d75-9450-262bf3ee3576"
									role="button"
									href={proDesignUrl}
									className="hc-banner-content__cta--button"
								>
									{footerConfig.proDesignCta}
								</a>
							</div>
						</div>
					</div>
					<div className="hc-banner-background">
						<FooterBackground />
					</div>
				</div>
			)}
		</div>
	);
};

export default Footer;
