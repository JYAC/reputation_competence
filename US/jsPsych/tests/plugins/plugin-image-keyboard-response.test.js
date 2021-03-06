const root = '../../';

jest.useFakeTimers();

describe('image-keyboard-response', function(){

	beforeEach(function(){
		require(root + 'jspsych.js');
		require(root + 'plugins/jspsych-image-keyboard-response');
	});

	test('loads correctly', function(){
		expect(typeof window.jsPsych.plugins['image-keyboard-response']).not.toBe('undefined');
	});

	test('displays image stimulus', function(){
		var trial = {
			type: 'image-keyboard-response',
			stimulus: '../media/blue.png'
		}

		jsPsych.init({
			timeline: [trial]
		});

		expect(jsPsych.getDisplayElement().innerHTML).toBe('<img src=\"../media/blue.png\" id=\"jspsych-image-keyboard-response-stimulus\">');
	});

	test('display clears after key press', function(){
		var trial = {
			type: 'image-keyboard-response',
			stimulus: '../media/blue.png',
			choices: ['f','j'],
		}

		jsPsych.init({
			timeline: [trial]
		});

		expect(jsPsych.getDisplayElement().innerHTML).toMatch(new RegExp('<img src="../media/blue.png" id="jspsych-image-keyboard-response-stimulus">'));

		document.querySelector('.jspsych-display-element').dispatchEvent(new KeyboardEvent('keydown', {keyCode:70}));
		document.querySelector('.jspsych-display-element').dispatchEvent(new KeyboardEvent('keyup', {keyCode:70}));

		expect(jsPsych.getDisplayElement().innerHTML).toBe('');
	});

	test('prompt should append html below stimulus', function(){
		var trial = {
			type: 'image-keyboard-response',
			stimulus: '../media/blue.png',
			choices: ['f','j'],
			prompt: '<div id="foo">this is a prompt</div>'
		}

		jsPsych.init({
			timeline: [trial]
		});

		expect(jsPsych.getDisplayElement().innerHTML).toMatch(new RegExp('<img src="../media/blue.png" id="jspsych-image-keyboard-response-stimulus"><div id="foo">this is a prompt</div>'));
	});

	test('should hide stimulus if stimulus-duration is set', function(){
		var trial = {
			type: 'image-keyboard-response',
			stimulus: '../media/blue.png',
			choices:['f','j'],
			stimulus_duration: 500, 
		}

		jsPsych.init({
			timeline: [trial]
		});

		expect(jsPsych.getDisplayElement().querySelector('#jspsych-image-keyboard-response-stimulus').style.visibility).toMatch("");
		jest.runTimersToTime(500);
		expect(jsPsych.getDisplayElement().querySelector('#jspsych-image-keyboard-response-stimulus').style.visibility).toMatch("hidden");

	});

	test('should end trial when trial duration is reached', function(){
		var trial = {
			type: 'image-keyboard-response',
			stimulus: '../media/blue.png',
			choices: ['f','j'],
			trial_duration: 500
		}

		jsPsych.init({
			timeline: [trial]
		});

		expect(jsPsych.getDisplayElement().innerHTML).toMatch(new RegExp('<img src="../media/blue.png" id="jspsych-image-keyboard-response-stimulus">'));
		jest.runTimersToTime(500);
		expect(jsPsych.getDisplayElement().innerHTML).toBe('');
	});

	test('should end trial when key is pressed', function(){
		var trial = {
			type:'image-keyboard-response',
			stimulus: '../media/blue.png',
			choices: ['f','j'],
			response_ends_trial: true,
		}

		jsPsych.init({
			timeline: [trial]
		});

		expect(jsPsych.getDisplayElement().innerHTML).toMatch(new RegExp('<img src="../media/blue.png" id="jspsych-image-keyboard-response-stimulus">'));

		document.querySelector('.jspsych-display-element').dispatchEvent(new KeyboardEvent('keydown', {keyCode:70}));
		document.querySelector('.jspsych-display-element').dispatchEvent(new KeyboardEvent('keyup', {keyCode:70}));

		expect(jsPsych.getDisplayElement().innerHTML).toBe('');
	});
});