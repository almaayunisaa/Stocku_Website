#include <stdio.h>
#include <string.h>

#define MAX_PRODUCTS 20

typedef struct {
    char name[50];
    int quantity;
} Product;

void sortProductsByName(Product products[], int size) {
    Product temp;
    for (int i = 0; i < size - 1; i++) {
        for (int j = i + 1; j < size; j++) {
            if (strcmp(products[i].name, products[j].name) > 0) {
                temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
    }
}


void viewProducts(Product products[], int size) {
    for (int i = 0; i < size; i++) {
        printf("Produk: %s, Jumlah: %d\n", products[i].name, products[i].quantity);
    }
}

int main() {
    Product products[MAX_PRODUCTS] = {
        {"Laptop Dell Inspiron", 55}, {"Keyboard Logitech", 20}, {"Mouse Wireless Logitech", 85}, {"Printer Canon Pixma", 10},
        {"Monitor Samsung 24 Inch", 5},  {"Headphone Sony WH-1000XM4", 50}, {"Smartphone Samsung Galaxy S21", 25}, {"Tablet Apple iPad Pro", 15},
        {"Smartwatch Apple Series 6", 100}, {"External Hard Drive Seagate", 35}, {"Flash Drive Sandisk 32GB", 45}, {"Router TP-Link WiFi 6", 30},
        {"Webcam Logitech C920", 70}, {"Power Bank Anker 20000mAh", 65}, {"Speaker JBL Portable", 40}, {"Smart TV LG 55 Inch", 95},
        {"Gaming Chair DXRacer", 80}, {"Mechanical Keyboard Razer", 90}, {"Portable SSD Samsung T5", 75}, {"Graphics Card Nvidia RTX 3080", 60}
    };


    printf("Daftar Produk :\n");
    viewProducts(products, MAX_PRODUCTS);

    char userInput;
    printf("\nApakah Anda ingin mensorting produk berdasarkan abjad? (Y/N): ");
    scanf(" %c", &userInput);

    if (userInput == 'Y' || userInput == 'y') {

        sortProductsByName(products, MAX_PRODUCTS);

        printf("\nDaftar Produk Setelah Sorting:\n");
        viewProducts(products, MAX_PRODUCTS);
    }

    printf("\nProgram selesai.\n");
    return 0;
}
