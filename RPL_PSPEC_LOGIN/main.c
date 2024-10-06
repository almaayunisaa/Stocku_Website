#include <stdio.h>
#include <stdlib.h>

int main()
{
    char usn[];
    char password[];
    bool validate = false;

    char dbUsn[] = "1234";
    char dbPass[] = "12345";

    scanf(usn);
    scanf(password);

    if ((usn==dbUsn) && (password==dbPass)) {
        validate=true
    }

    printf(validate);
    return 0;
}
