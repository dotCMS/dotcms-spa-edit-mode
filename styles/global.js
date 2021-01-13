import { createGlobalStyle } from 'styled-components';
import { reset } from '../styles/reset';
import { reflex } from '../styles/reflex';

export const GlobalStyle = createGlobalStyle`
	:root {
	--primary-black: #444444;
	--dotcms-purple: #C336E5;
	--dotcms-purple-80: hsla(288, 77%, 80%, 1);
	--dotcms-purple-20: hsla(288, 77%, 20%, 1);
	--primary-spacing: 2rem;
	--primary-grey: #F1F3F4;
	}
	${reset}
	* {
			box-sizing: border-box;
	}

	body {
		line-height: 1.6;
		background-color: var(--primary-grey);
		font-family: "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	h1,
	h2,
	h3,
	h4 {
		margin-bottom: 1.6rem;
		font-weight: bold;
	}

	h1 {
		font-size: 3.375em;
		line-height: 4.75rem;
	}
	h2 {
		font-size: 2.25em;
		line-height: 4rem;
		margin-bottom: 1rem;
	}
	h3 {
		font-size: 1.5em;
	}
	h4 {
		font-size: 1.125em;
	}

	p,
	ul {
		margin-bottom: 1.2rem;
		color: #4f4f4f;
	}

	b {
		font-weight: bold;
	}

	a {
		color: var(--primary-black);
		&:hover {
			color: var(--dotcms-purple);
		}
	}
	nav.menu__list {
		a {
			margin: 0 .5rem;
			text-decoration: none;
			font-weight: bold;
		}
	}
	ul.menu__list {
		list-style: none;
		display: flex;
		 a {
			font-weight: 500;
			text-decoration: none;
		}
		& > * + * {
			margin-left: 1.5rem;
		}
		a:active,
		a:hover,
		li.active > a {
			color: var(--dotcms-purple);
		}
	}
	#nprogress .bar {
		background: var(--dotcms-purple) !important;
	}
	/* Make clicks pass-through */
	#nprogress {
		pointer-events: none;
	}

	#nprogress .bar {
		background: #29d;

		position: fixed;
		z-index: 1031;
		top: 0;
		left: 0;

		width: 100%;
		height: 2px;
	}

	/* Fancy blur effect */
	#nprogress .peg {
		display: block;
		position: absolute;
		right: 0px;
		width: 100px;
		height: 100%;
		box-shadow: 0 0 10px #29d, 0 0 5px #29d;
		opacity: 1;

		-webkit-transform: rotate(3deg) translate(0px, -4px);
		-ms-transform: rotate(3deg) translate(0px, -4px);
		transform: rotate(3deg) translate(0px, -4px);
	}

	/* Remove these to get rid of the spinner */
	#nprogress .spinner {
		display: block;
		position: fixed;
		z-index: 1031;
		top: 15px;
		right: 15px;
	}
	#nprogress .spinner-icon {
		width: 18px;
		height: 18px;
		box-sizing: border-box;

		border: solid 2px transparent;
		border-top-color: #29d;
		border-left-color: #29d;
		border-radius: 50%;

		-webkit-animation: nprogress-spinner 400ms linear infinite;
		animation: nprogress-spinner 400ms linear infinite;
	}

	.nprogress-custom-parent {
		overflow: hidden;
		position: relative;
	}

	.nprogress-custom-parent #nprogress .spinner,
	.nprogress-custom-parent #nprogress .bar {
		position: absolute;
	}

	@-webkit-keyframes nprogress-spinner {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	@keyframes nprogress-spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap; /* added line */
	}
	${reflex}
`;
