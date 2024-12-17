#include <errno.h>
#include <windows.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

__declspec(dllexport) int checkInt(int a, int b) {
	return a + 2 + b;
}


__declspec(dllexport) long checkLong(int a, int b) {
	return 300000000;
}


__declspec(dllexport) char checkChar(char ch) {
	return ch + 1;
}

__declspec(dllexport) float checkFloat() {
	return 789.123456f;
}

__declspec(dllexport) char* checkUTF() {
	return "שלום";
}

__declspec(dllexport) void checkVoid() {
	printf("yellow\n");
}



__declspec(dllexport) double checkDouble() {
	double myVar = 789.123456;
	return myVar;
}

__declspec(dllexport) char *checkString() {
	return "hello node";
}

struct exampleStruct {	
	int a;
	char b;
	char c;
};


__declspec(dllexport) struct exampleStruct checkStruct() {
	struct exampleStruct max = { 5, 'A', 'D'};
	return max;
}

__declspec(dllexport) struct exampleStruct structArg(struct exampleStruct max) {
	max.a = 10;
	return max;
}

__declspec(dllexport) bool checkBool() {
	return true;
}


__declspec(dllexport) int checkArr(int a[3]) {
	return a[0];
}

__declspec(dllexport) int checkPoint(int *a) {
	printf("in point");
	return a[1];
}

__declspec(dllexport) int *returnPoint() {
	int* arr = malloc(3 * sizeof(int));
	arr[0] = 9;
	arr[1] = 10;
	arr[2] = 11;
	return arr;
}

struct parentStruct {
	struct exampleStruct childStruct;
	int d;
};

__declspec(dllexport) int computePP(int rows, int cols, int **matrix) {
	int sum = 0;
	for (int i=0; i< rows; i++) {
		for (int j=0; j< cols; j++) {
			printf("%d", i);
			printf("%d\n", j);
			printf("val:%d\n", matrix[i][j]);
			sum += matrix[i][j];
		}	
	}
	printf("\nsum: %d\n", sum);
	return sum;
}

__declspec(dllexport) int computePointerArr(int rows, int cols, int (*matrix)[3]) {
	int sum = 0;
	for (int i=0; i< rows; i++) {
		for (int j=0; j< cols; j++) {
			printf("%d", i);
			printf("%d\n", j);
			printf("val:%d\n", matrix[i][j]);
			sum += matrix[i][j];
		}	
	}
	printf("\nsum: %d\n", sum);
	return sum;
}

__declspec(dllexport) int computeArrPointer(int rows, int cols, int *matrix[]) {
	int sum = 0;
	for (int i=0; i< rows; i++) {
		for (int j=0; j< cols; j++) {
			printf("%d", i);
			printf("%d\n", j);
			printf("val:%d\n", matrix[i][j]);
			sum += matrix[i][j];
		}	
	}
	printf("\nsum: %d\n", sum);
	return sum;
}


__declspec(dllexport) int compute2D(int rows, int cols, int matrix[3][3]) {
	int sum = 0;
	for (int i=0; i< rows; i++) {
		for (int j=0; j< cols; j++) {
			printf("%d", i);
			printf("%d\n", j);
			printf("val:%d\n", matrix[i][j]);
			sum += matrix[i][j];
		}	
	}
	printf("\nsum: %d\n", sum);
	return sum;
}


__declspec(dllexport) struct parentStruct *checkArrayOfNestedStructs(struct exampleStruct *arg, struct parentStruct * arg2, int adder) {
	arg2[0].childStruct.a = arg2[0].d + arg[1].a + adder;
	return arg2;
}

struct structWithArray {
	int arr[3];
	int *arr2;
};

 
__declspec(dllexport) struct structWithArray checkStructWithArray(struct structWithArray arg) {
	int temp = arg.arr[0];
	arg.arr[0] = arg.arr[2];
	arg.arr[2] = temp;
	arg.arr2[1] = arg.arr2[1] + 10;
	return arg;
}