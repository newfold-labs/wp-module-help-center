/* eslint-disable @wordpress/i18n-no-flanking-whitespace */
import { __, sprintf } from '@wordpress/i18n';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ReactComponent as FooterBackground } from '../icons/footer.svg';

const Footer = () => {
	const { disliked, noResult } = useSelector( ( state ) => state.helpcenter );
	const brandConfig = window.nfdHelpCenter?.brandConfig || {};
	const hasPhone = brandConfig.hasPhone !== false;
	const supportTemplate = hasPhone
		? ( window.nfdHelpCenter?.supportMessageTemplate ||
			__( 'If you need help with your %1$s account, give us a call at %2$s or %3$s with one of our support agents — we\'re here for you!', 'wp-module-help-center' ) )
		: ( window.nfdHelpCenter?.supportMessageTemplateNoPhone ||
			__( 'If you need help with your %1$s account, %2$s with one of our support agents — we\'re here for you!', 'wp-module-help-center' ) );
	const [ contactUrl, setContactUrl ] = useState( brandConfig.contactUrl || '' );
	const [ proDesignUrl, setProDesignUrl ] = useState(
		brandConfig.proDesignUrl || ''
	);

	useEffect( () => {
		let utmInterval;
		const applyUtmIfAvailable = () => {
			if (
				window.NewfoldRuntime?.linkTracker?.addUtmParams instanceof
					Function
			) {
				setContactUrl(
					window.NewfoldRuntime.linkTracker.addUtmParams(
						brandConfig.contactUrl
					)
				);
				if ( brandConfig.showProDesignBanner && brandConfig.proDesignUrl ) {
					setProDesignUrl(
						window.NewfoldRuntime.linkTracker.addUtmParams(
							brandConfig.proDesignUrl
						)
					);
				}
				if ( utmInterval ) clearInterval( utmInterval );
			}
		};

		if (
			window.NewfoldRuntime?.linkTracker?.addUtmParams instanceof Function
		) {
			applyUtmIfAvailable();
		} else {
			setContactUrl( brandConfig.contactUrl || '' );
			if ( brandConfig.showProDesignBanner && brandConfig.proDesignUrl ) {
				setProDesignUrl( brandConfig.proDesignUrl || '' );
			}
			utmInterval = setInterval( applyUtmIfAvailable, 200 );
		}

		return () => {
			if ( utmInterval ) clearInterval( utmInterval );
		};
	}, [] );

	const chatLink = `<a href="${ contactUrl }" target="_blank" rel="noreferrer">${ __( 'Chat Live', 'wp-module-help-center' ) }</a>`;
	const supportMessage = hasPhone
		? sprintf( supportTemplate, brandConfig.accountName || __( 'Bluehost', 'wp-module-help-center' ), `<a href="tel:${ brandConfig.phone || '8884014678' }">${ brandConfig.phoneDisplay || '888-401-4678' }</a>`, chatLink )
		: sprintf( supportTemplate, brandConfig.accountName || __( 'Bluehost', 'wp-module-help-center' ), chatLink );

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
			{ brandConfig.showProDesignBanner && (
				<div className="hc-banner__wrapper">
					<div className="hc-banner">
						<div className="hc-banner-content">
							<p className="hc-banner-content__heading">
							{ brandConfig.proDesignHeading }
							<br />
							{ brandConfig.proDesignSubheading }
							</p>
							<p className="hc-banner-content__body">
								{ brandConfig.proDesignBody }
							</p>
							<div className="hc-banner-content__cta">
								<a
									data-action="load-nfd-ctb"
									data-ctb-id="838cc912-adb3-4d75-9450-262bf3ee3576"
									role="button"
									href={proDesignUrl}
									className="hc-banner-content__cta--button"
								>
									{ brandConfig.proDesignCta }
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
