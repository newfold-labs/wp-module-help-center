import { __ } from '@wordpress/i18n';
import { ReactComponent as LaptopIcon } from '../icons/figure-using-laptop.svg';
import { ReactComponent as PhoneIcon } from '../icons/phone.svg';
import { ReactComponent as ChatIcon } from '../icons/chat-bubble.svg';

const Footer = () => {
	return (
		<div className="nfd-hc-modal__footer">
			<div className="helpcenter-supportinfo__wrapper">
				<div className="breakline">
					<hr />
				</div>
				<div>
					<p>{ __( 'Account Support', 'wp-module-help-center' ) }</p>
					<p>
						{ __(
							`If you need help with your Bluehost account, give us a call at `,
							'wp-module-help-center'
						) }
						<span>
							<a href="#">888-401-4678</a>
						</span>
						{ __( ' or ', 'wp-module-help-center' ) }
						<span>
							<a href="#">Chat Live</a>
						</span>
						{ __(
							` with one of our support agents — we're here for you!`,
							'wp-module-help-center'
						) }
					</p>
				</div>
				<div className="square">
					<div className="footer-text">
						<p>
							{ __(
								`Your dream site is just a click away.`,
								'wp-module-help-center'
							) }
						</p>
						<p>
							{ __(
								`Let's build a site you love, together.`,
								'wp-module-help-center'
							) }
						</p>
						<p>
							{ __(
								'With Pro Design Live, our expert team bring your vision to life. We help you to create and the site you’ve always dreamed of — tailored to your goals, ready to perform.',
								'wp-module-help-center'
							) }
						</p>
					</div>
					<div className="startbutton">
						<button>
							{ __( 'Start Now', 'wp-module-help-center' ) }
						</button>
						<LaptopIcon />
					</div>
				</div>
			</div>
		</div>
	);
};
// function Footer() {
// 	return (
// 		<div className="nfd-hc-modal__footer">
// 			<div className="helpcenter-supportinfo__wrapper">
// 				<div>
// 					<h4>
// 						{ __( 'Account Support', 'wp-module-help-center' ) }
// 					</h4>
// 					<div className="helpcenter-supportinfo__text">
// 						{ __(
// 							'If you need help with your Bluehost account, contact our support team:',
// 							'wp-module-help-center'
// 						) }
// 					</div>
// 					<div className="helpcenter-supportinfo__telephone">
// 						<span>
// 							<PhoneIcon />
// 						</span>
// 						<span>
// 							<a
// 								href="tel:8884014678"
// 								aria-label="Call 888-401-4678"
// 							>
// 								888-401-4678
// 							</a>
// 						</span>
// 					</div>
// 					<div className="helpcenter-supportinfo__chat">
// 						<span>
// 							<ChatIcon />
// 						</span>
// 						<span>
// 							<a
// 								href="https://www.bluehost.com/contact"
// 								aria-label={ __(
// 									'Chat with support',
// 									'wp-module-help-center'
// 								) }
// 								target="_blank"
// 								rel="noreferrer"
// 							>
// 								{ __(
// 									'Chat with support',
// 									'wp-module-help-center'
// 								) }
// 							</a>
// 						</span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export default Footer;
