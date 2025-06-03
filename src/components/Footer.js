/* eslint-disable @wordpress/i18n-no-flanking-whitespace */
import { __ } from '@wordpress/i18n';
import { useSelector } from 'react-redux';
import { ReactComponent as FooterBackground } from '../icons/footer.svg';

const Footer = () => {
	const disliked = useSelector((state) => state.helpcenter.disliked);
	return (
		<div className="nfd-hc-modal__footer">
			<div className="helpcenter-supportinfo__wrapper">
				{!disliked && (
					<>
						<hr className="helpcenter-supportinfo__breakline" />
						<div className="helpcenter-supportinfo__text">
							<p className="helpcenter-supportinfo__text--heading">
								{__('Account Support', 'wp-module-help-center')}
							</p>
							<p className="helpcenter-supportinfo__text--body">
								{__(
									'If you need help with your Bluehost account, give us a call at ',
									'wp-module-help-center'
								)}
								<a href="tel:8884014678">888-401-4678</a>
								{' or '}
								<a
									href="https://www.bluehost.com/contact"
									target="_blank"
									rel="noreferrer"
								>
									Chat Live
								</a>
								{__(
									" with one of our support agents — we're here for you!",
									'wp-module-help-center'
								)}
							</p>
						</div>
					</>
				)}
			</div>
			<div className="hc-banner__wrapper">
				<div className="hc-banner">
					<div className="hc-banner-content">
						<p className="hc-banner-content__heading">
							{__(
								`Your dream site is just a click away.`,
								'wp-module-help-center'
							)}
							<br />
							{__(
								`Let's build a site you love, together.`,
								'wp-module-help-center'
							)}
						</p>
						<p className="hc-banner-content__body">
							{__(
								'With Pro Design Live, our expert team bring your vision to life. We help you to create and the site you’ve always dreamed of — tailored to your goals, ready to perform.',
								'wp-module-help-center'
							)}
						</p>
						<div className="hc-banner-content__cta">
							<a
								data-action="load-nfd-ctb"
								data-ctb-id="838cc912-adb3-4d75-9450-262bf3ee3576"
								role="button"
								href="https://www.bluehost.com/pro-design-live"
								className="hc-banner-content__cta--button"
							>
								{__('Start Now', 'wp-module-help-center')}
							</a>
						</div>
					</div>
				</div>
				<div className="hc-banner-background">
					<FooterBackground />
				</div>
			</div>
		</div>
	);
};

export default Footer;
