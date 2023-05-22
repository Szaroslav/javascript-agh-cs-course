import { Vehicle } from "../../../../interfaces/vehicle";

namespace MainScript {
    const API_URL = 'http://localhost:8000';
    const list = document.querySelector('.vehicle-list');

    const userMockup = {
        userId: '645815402881dccff34b88a8',
        firstName: 'Jakub',
        lastName: 'Szewczyk'
    };

    // Helper functions ===================================================

    // Format console logs
    const prettyLog = (message: any, isSuccess: boolean): void => {
        const header = isSuccess ? 'SUCCESS' : 'ERROR';
        const color = isSuccess ? '#2ae66b' : '#eb1c2f';
        const f = isSuccess ? console.log : console.error;

        f(
            `%c[${header}]`,
            `color: ${color}; font-weight: bold`,
            message
        );
    };

    // Get an item ObjectId (id of the MongoDB)
    const getItemId = (el: Element | null): string | null => {
        if (!el || !el.classList)
            return null;
        if (el.classList.contains('vehicle-content'))
            return el.getAttribute('data-id');

        return getItemId(el.parentElement);
    };

    // Setup fetch API options to send data (excluding 'GET' method)
    const setupRequest = (body: object): object => {
        return {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        };
    };

    // ====================================================================

    const rentVehicle = async (event: Event) => {
        const id: string | null = getItemId(event.target as Element);
        try {
            const res: Response = await fetch(`${API_URL}/vehicles`, {
                method: 'POST',
                ...setupRequest({ vehicleId: id, ...userMockup })
            });
            if (!res.ok)
                throw new Error('Not found');

            return await res.json();
        }
        catch (error) {
            prettyLog(error, false);
            return null;
        }
    };

    const returnVehicle = async (event: Event) => {
        const id: string | null = getItemId(event.target as Element);
        try {
            const res: Response = await fetch(`${API_URL}/vehicles`, {
                method: 'PUT',
                ...setupRequest({ vehicleId: id, ...userMockup })
            });
            if (!res.ok)
                throw new Error('Not found');

            return await res.json();
        }
        catch (error) {
            prettyLog(error, false);
            return null;
        }
    };

    const sellVehicle = async (event: Event) => {
        const id: string | null = getItemId(event.target as Element);
        try {
            const res: Response = await fetch(`${API_URL}/vehicles`, {
                method: 'DELETE',
                ...setupRequest({ vehicleId: id, ...userMockup })
            });
            if (!res.ok)
                throw new Error('Not found');

            return await res.json();
        }
        catch (error) {
            prettyLog(error, false);
            return null;
        }
    };

    document.querySelectorAll('.rent-button').forEach((btn: Node) => {
        btn.addEventListener('click', rentVehicle);
    });

    document.querySelectorAll('.return-button').forEach((btn: Node) => {
        btn.addEventListener('click', returnVehicle);
    });

    document.querySelectorAll('.sell-button').forEach((btn: Node) => {
        btn.addEventListener('click', sellVehicle);
    });
}
