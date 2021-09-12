import sharpImage from "../../../server/dist/helpers/sharpImage";
import * as fs from "fs";

const VALID_FILES = ["fjord.jpg", "palmtunnel.jpg"];
const INVALID_FILES = ["test.jpg", "xxx.jpg"];
const CUSTOM_HEIGHT = 90;
const CUSTOM_WIDTH = 100;

beforeAll(done => {
	fs.rmdir("images/processed/", {"recursive": true}, (err) => {
		done();
	});
});

afterAll(done => {
	fs.rmdir("images/processed/", {"recursive": true}, (err) => {
		done();
	});
});
describe("Helper Package Test", function(){
it("Helper package's attributes should be available", () => {
	expect(sharpImage.hasOwnProperty("imageId")).toBeTruthy();
	expect(sharpImage.hasOwnProperty("height")).toBeTruthy();
	expect(sharpImage.hasOwnProperty("isOriginal")).toBeTruthy();
});

it("Helper package's methods should be available", () => {
	expect(typeof sharpImage.init).toEqual("function");
	expect(typeof sharpImage.getStockImagePath).toEqual("function");
	expect(typeof sharpImage.getImagePath).toEqual("function");
	expect(typeof sharpImage.readImageStream).toEqual("function");
	expect(typeof sharpImage.checkIfOriginalImageExists).toEqual("function");
	expect(typeof sharpImage.checkIfTransformedImageExists).toEqual("function");
});});

describe("Image Processing Test", function(){
it("Creating a new image using original properties", async () => {
	let sharpImageObject = await sharpImage.init(VALID_FILES[0]);
	expect(sharpImageObject.imageId).toEqual(VALID_FILES[0]);
	expect(sharpImageObject.width).toEqual(0);
	expect(sharpImageObject.height).toEqual(0);
});

it("Creating a new image using custom properties", async () => {

	expect(
		fs.existsSync(`images/full/${VALID_FILES[0]}`)
	).toBeTruthy();


	expect(
		fs.existsSync(`images/processed/${CUSTOM_WIDTH}x${CUSTOM_HEIGHT}/${VALID_FILES[0]}`)
	).toBeFalsy();


	let sharpImageObject = await sharpImage.init(VALID_FILES[0], CUSTOM_WIDTH, CUSTOM_HEIGHT);

	expect(sharpImageObject.imageId).toEqual(VALID_FILES[0]);
	expect(sharpImageObject.width).toEqual(CUSTOM_WIDTH);
	expect(sharpImageObject.height).toEqual(CUSTOM_HEIGHT);
	expect(sharpImageObject.isOriginal).toEqual(false);

	expect(
		fs.existsSync(`images/processed/${CUSTOM_WIDTH}x${CUSTOM_HEIGHT}/${VALID_FILES[0]}`)
	).toBeTruthy();
});

it("Default the image to the original one if sizing properties are invalid", async () => {
	let sharpImageObject = await sharpImage.init(VALID_FILES[1], null, "");

	expect(sharpImageObject.imageId).toEqual(VALID_FILES[1]);
	expect(sharpImageObject.width).toEqual(0);
	expect(sharpImageObject.height).toEqual(0);
	expect(sharpImageObject.isOriginal).toEqual(true);

});

it("Return the original/stock image path through the specialized method", async () => {
	let sharpImageObject = await sharpImage.init(VALID_FILES[0], 100, 100);
	expect(sharpImageObject.getStockImagePath()).toEqual(`./images/full/${VALID_FILES[0]}`);
});

it("Return the processed image path through the specialized method", async () => {
	let sharpImageObject = await sharpImage.init(VALID_FILES[0], 100, 100);
	expect(sharpImageObject.getImagePath()).toEqual(`./images/processed/100x100/${VALID_FILES[0]}`);
});

it("Offers the image as stream", (done) => {
	sharpImage.init(VALID_FILES[0]).then(sharpImageObject => {
		sharpImageObject.readImageStream(
		).on("data", () => {
			return false;
		}).on("end", () => {
			done();
		});
	});
});

it("Throw an error if the original image doesn't exist", async () => {
	expect(
		fs.existsSync(`images/full/${INVALID_FILES[0]}`)
	).toBeFalsy();

	try {
		await sharpImage.init(INVALID_FILES[0]);
	} catch (e)  {
		let error = JSON.parse(e.message);
		expect(error.status).toEqual(404);
		expect(error.message).toEqual("Image test.jpg not found.");
	}
});
});
