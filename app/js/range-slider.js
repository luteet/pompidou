export default function rangeSlider(onChange) {
	document.querySelectorAll('.range').forEach(range => {

		const minInput = range.querySelector('[data-is-min]'),
		maxInput = range.querySelector('[data-is-max]'),
		rangeElement = range.querySelector('.range__element');

		const rangeEl = new window.JSR.JSR({
			modules: [
			  new window.JSR.ModuleLimit({
				min: Number(rangeElement.dataset.min),
				max: Number(rangeElement.dataset.max),
			  }),
			  new window.JSR.ModuleRail(),
			  new window.JSR.ModuleSlider(),
			  new window.JSR.ModuleBar(),
			  //new window.JSR.ModuleLabel(),
			],
			
			config: {
				min: Number(rangeElement.dataset.min),
				max: Number(rangeElement.dataset.max),
				step: 1,
				initialValues: [Number(rangeElement.dataset.minValue), Number(rangeElement.dataset.maxValue)],
				container: document.querySelector('.range__element div'),
			}
		});

		minInput.addEventListener("input", () => {
			minInput.value = minInput.value.replace(/[\D]+/g,"");
		})

		maxInput.addEventListener("input", () => {
			maxInput.value = maxInput.value.replace(/[\D]+/g,"");
		})

		minInput.addEventListener("blur", () => {
			rangeEl.setRealValue(0,Number(minInput.value.replace(/[\D]+/g,"")));
		})

		maxInput.addEventListener("blur", () => {
			rangeEl.setRealValue(1,Number(maxInput.value.replace(/[\D]+/g,"")));
		})
		
		rangeEl.onValueChange(function (ValueChangeHandler) {

			document.querySelectorAll(".filter_checked_list").forEach(list => {
				list
			})

			if(ValueChangeHandler['index'] == 0) {
				minInput.value = ValueChangeHandler['real'];
			} else if(ValueChangeHandler['index'] == 1) {
				maxInput.value = ValueChangeHandler['real'];
			}

			onChange();
		})
		
		document.querySelectorAll(".filter_reset").forEach(resetButton => {
			resetButton.addEventListener("click", () => {
				minInput.value = minInput.dataset.value;
				maxInput.value = maxInput.dataset.value;

				rangeEl.setRealValue(0,Number(minInput.dataset.value));
				rangeEl.setRealValue(1,Number(maxInput.dataset.value));
			})
		})

	})
}