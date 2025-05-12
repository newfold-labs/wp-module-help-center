/* eslint-disable @wordpress/i18n-no-flanking-whitespace */
import { __ } from '@wordpress/i18n';
import { ReactComponent as LaptopIcon } from '../icons/figure-using-laptop.svg';

const Footer = () => {
	return (
		<div className="nfd-hc-modal__footer">
			<div className="nfd-hc-modal__footer__breakline">
				<hr />
			</div>
			<div className="helpcenter-supportinfo__wrapper">
				<div className="helpcenter-supportinfo__text">
					<p>{ __( 'Account Support', 'wp-module-help-center' ) }</p>
					<p>
						{ __(
							'If you need help with your Bluehost account, give us a call at ',
							'wp-module-help-center'
						) }
						<a href="tel:8884014678">888-401-4678</a>
						{ ' or ' }
						<a href="https://www.bluehost.com/contact">Chat Live</a>
						{ __(
							" with one of our support agents — we're here for you!",
							'wp-module-help-center'
						) }
					</p>
				</div>
			</div>
			<div className="square">
				<div className="footer-text">
					<p className="footer-text__heading">
						{ __(
							`Your dream site is just a click away.`,
							'wp-module-help-center'
						) }
						<br />
						{ __(
							`Let's build a site you love, together.`,
							'wp-module-help-center'
						) }
					</p>
					<p className="footer-text__body">
						{ __(
							'With Pro Design Live, our expert team bring your vision to life. We help you to create and the site you’ve always dreamed of — tailored to your goals, ready to perform.',
							'wp-module-help-center'
						) }
					</p>
					<div className="startbutton">
						<a
							role="button"
							href="https://www.bluehost.com/solutions/website-design?utm_source=wp-admin%2Findex.php&utm_medium=bluehost_plugin&channelid=P99C100S1N0B3003A151D115E0000V111"
							className="cta-pro-design"
						>
							{ __( 'Start Now', 'wp-module-help-center' ) }
						</a>
					</div>
					<div className="LaptopIcon">
						<LaptopIcon />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
