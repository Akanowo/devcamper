const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	const bootcamps = await Bootcamp.find();
	return res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps,
	});
});

// @desc      Get single bootcamps
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const bootcamp = await Bootcamp.findById(id);

	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
	}

	return res.status(200).json({
		success: true,
		data: bootcamp,
	});
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const bootcamp = await Bootcamp.create(req.body);

	res.status(201).json({
		success: true,
		data: bootcamp,
	});
});

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updatetBootcamp = async (req, res, next) => {
	try {
		const { id } = req.params;
		const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!bootcamp) {
			return next(
				new ErrorResponse(`Bootcamp not found with id of ${id}`, 404)
			);
		}

		return res.status(200).json({ success: true, data: bootcamp });
	} catch (error) {
		return next(error);
	}
};

// @desc      Delete single bootcamps
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const bootcamp = await Bootcamp.findByIdAndDelete(id);
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404));
	}

	return res.status(200).json({
		success: true,
		data: {},
	});
});
