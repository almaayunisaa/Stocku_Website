#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int quantity;
    float price;
} Product;

void add_product() {
    Product p;
    FILE *file;
    char choice[10];

    file = fopen("products.txt", "a");
    if (file == NULL) {
        printf("Error opening file!\n");
        exit(1);
    }

    printf("Enter Product Name (or type 'cancel' to cancel): ");
    fgets(p.name, sizeof(p.name), stdin);
    p.name[strcspn(p.name, "\n")] = 0;

    if (strcmp(p.name, "cancel") == 0) {
        printf("Product addition canceled. Returning to product list.\n");
        fclose(file);
        display_products();
        return;
    }

    printf("Enter Quantity: ");
    scanf("%d", &p.quantity);

    printf("Enter Price: ");
    scanf("%f", &p.price);

    fprintf(file, "Product: %s, Quantity: %d, Price: %.2f\n", p.name, p.quantity, p.price);

    fclose(file);

    printf("Product added successfully!\n");
}

void display_products() {
    char ch;
    FILE *file;

    file = fopen("products.txt", "r");
    if (file == NULL) {
        printf("No products found!\n");
        return;
    }

    printf("\n--- Product List ---\n");
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }

    fclose(file);
}

int main() {
    int choice;

    while (1) {
        printf("\nWarehouse Stock Management\n");
        printf("1. Add Product\n");
        printf("2. Display Products\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar();

        switch (choice) {
            case 1:
                add_product();
                break;
            case 2:
                display_products();
                break;
            case 3:
                printf("Exiting program.\n");
                exit(0);
            default:
                printf("Invalid choice, try again.\n");
        }
    }

    return 0;
}
