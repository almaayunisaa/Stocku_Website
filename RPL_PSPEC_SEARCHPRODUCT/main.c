#include <stdio.h>
#include <stdbool.h>
#include <string.h>

typedef struct {
    char name[50];
    int stock;
} Product;

void DisplaySearchResult(Product p);
void ShowErrorMessage(char query[]);
bool AdminClicksSearch();
bool ProductExists(char query[], Product gudang[], int size, Product *foundProduct);

int main() {
    Product gudang[20] = {
        {"Laptop", 10}, {"Mouse", 25}, {"Keyboard", 15}, {"Monitor", 8}, {"Printer", 12},
        {"Scanner", 5}, {"Webcam", 20}, {"Headphone", 30}, {"Microphone", 18}, {"Smartphone", 7},
        {"Tablet", 11}, {"Smartwatch", 14}, {"Router", 9}, {"Switch", 6}, {"RAM", 32},
        {"Hard Disk", 10}, {"SSD", 16}, {"Power Bank", 22}, {"Flash Drive", 40}, {"Charger", 13}
    };

    char searchQuery[50];
    Product foundProduct;
    bool continueSearch = true;

    printf("=== Daftar Produk di Gudang ===\n");
    for (int i = 0; i < 20; i++) {
        printf("%d. %s (Stok: %d)\n", i + 1, gudang[i].name, gudang[i].stock);
    }

    while (continueSearch) {
        printf("\nMasukkan nama produk yang ingin dicari (ketik '0' untuk keluar): ");
        scanf("%s", searchQuery);

        if (strcmp(searchQuery, "0") == 0) {
            continueSearch = false;
            printf("Program dihentikan. Terima kasih!\n");
            break;
        }

        if (AdminClicksSearch()) {
            if (ProductExists(searchQuery, gudang, 20, &foundProduct)) {
                DisplaySearchResult(foundProduct);
            } else {
                ShowErrorMessage(searchQuery);
            }
        }
    }

    return 0;
}

void DisplaySearchResult(Product p) {
    printf("\nHasil Pencarian:\nProduk ditemukan: %s (Stok: %d)\n", p.name, p.stock);
}

void ShowErrorMessage(char query[]) {
    printf("\nHasil Pencarian:\nProduk '%s' tidak ditemukan.\n", query);
}

bool AdminClicksSearch() {
    return true;
}

bool ProductExists(char query[], Product gudang[], int size, Product *foundProduct) {
    for (int i = 0; i < size; i++) {
        if (strcmp(gudang[i].name, query) == 0) {
            *foundProduct = gudang[i];
            return true;
        }
    }
    return false;
}
