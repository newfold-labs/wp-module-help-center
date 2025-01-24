import { __ } from '@wordpress/i18n';
import { ReactComponent as PhoneIcon } from '../icons/phone.svg';
import { ReactComponent as ChatIcon } from '../icons/chat-bubble.svg';

function Footer() {
	return (
		<div className="nfd-hc-modal__footer">
			<div className="helpcenter-supportinfo__wrapper">
				<div>
					<h4>
						{ __( 'Account Support', 'wp-module-help-center' ) }
					</h4>
					<div className="helpcenter-supportinfo__text">
						{ __(
							'If you need help with your Bluehost account, contact our support team:',
							'wp-module-help-center'
						) }
					</div>
					<div className="helpcenter-supportinfo__telephone">
						<span>
							<PhoneIcon />
						</span>
						<span>
							<a
								href="tel:8884014678"
								aria-label="Call 888-401-4678"
							>
								888-401-4678
							</a>
						</span>
					</div>
					<div className="helpcenter-supportinfo__chat">
						<span>
							<ChatIcon />
						</span>
						<span>
							<a
								href="https://www.bluehost.com/contact"
								aria-label={ __(
									'Chat with support',
									'wp-module-help-center'
								) }
								target="_blank"
								rel="noreferrer"
							>
								{ __(
									'Chat with support',
									'wp-module-help-center'
								) }
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
